<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { freelanceAxios } from "$lib/action/axios.service";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { toast } from "$lib/utils/toast";

  const props = $props<{ postData: { postDetail: any; bids: any[] } }>();
  const { postData } = props;
  const { postDetail: post, bids } = postData;

  let showBidForm = $state(false);
  let bidAmount = $state("");
  let bidMessage = $state("");
  let currentUserId = $state();
  let selectedFile: File | null = $state(null); // Changed 'file' to 'selectedFile' for clarity and correct binding
  let uploadProgress = $state(0);
  let uploadError = $state<string | null>(null);
  let isUploading = $state(false);
  let twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);

  const acceptBid = (bid: any) => {
    post.bids = post.bids.filter((bid: any) => bid.id !== bid.id);

    freelanceAxios.post("/accept-bid", {
      bidId: bid.id,
      postId: post.id,
      serviceProviderId: bid.serviceProviderId,
    });
  };

  const completeWork = (postId: string) => {
    freelanceAxios.post("/complete-work", {
      postId: postId,
    });
  };

  onMount(() => {
    if (browser) {
      currentUserId = JSON.parse(localStorage.getItem("userDetail") || "{}").id;
    }
  });

  // Event handler for file input change
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile = input.files[0];
      uploadError = null; // Clear previous errors when a new file is selected
    } else {
      selectedFile = null;
    }
  };

  async function uploadVideo() {
    if (!selectedFile) {
      uploadError = "Please select a video file first.";
      return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith("video/")) {
      uploadError = "Please select a valid video file.";
      return;
    }

    // Validate file size (e.g., 100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (selectedFile.size > maxSize) {
      uploadError = "File size must be less than 100MB.";
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("postId", post.id); // Assuming you have post data

    try {
      isUploading = true;
      uploadError = null;
      uploadProgress = 0;

      const response = await freelanceAxios.post("/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            uploadProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        },
      });

      console.log("Upload successful:", response.data);
      // You might want to update the UI or state to reflect the successful upload
      // e.g., clear the selected file, show a success message
      selectedFile = null; // Clear the selected file after successful upload
      uploadProgress = 0; // Reset progress
      //to show Simple success notification
      toast.success("Video uploaded successfully!");
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      //to show Simple error notification
      toast.error("Failed to upload video. Please try again.");
      // You might want to provide more specific error messages based on the error object
      throw error;
    } finally {
      isUploading = false;
    }
  }

  const handleBidSubmit = () => {
    if (!bidAmount || !bidMessage) {
      toast.error("Please enter bid amount and message");
      return;
    }
    const isGood = checkBidDifference(bidAmount, post.price);
    if (!isGood)
      toast.error("Invalid bid: amount must not exceed ±20% of the budget.");

    freelanceAxios.post("/bid", {
      bidAmount: bidAmount,
      bidMessage: bidMessage,
      postId: post.id,
    });
    toast.success("Bid submitted successfully");
    showBidForm = false;
    bidAmount = "";
    bidMessage = "";
  };
  const checkBidDifference = (bidAmount: any, budget: any) => {
    const threshold = budget * 0.2; // 20% of the budget

    // The original logic for `checkBidDifference` seems reversed based on the alert message.
    // If you want to allow bids within ±20% of the budget, the logic should be:
    if (bidAmount >= budget * 0.8 && bidAmount <= budget * 1.2) {
      return true; // Bid is within ±20% of the budget
    } else {
      return false; // Bid is outside ±20% of the budget
    }
  };

  const dispatch = createEventDispatcher();
</script>

<div class="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto my-8">
  {#if !post}
    <div class="text-center py-12">
      <p class="text-gray-500 text-lg">No post details available</p>
    </div>
  {:else}
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {post.title}
      </h1>

      <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span class="font-medium text-gray-700">Category:</span>
        <span class="bg-gray-100 px-2 py-1 rounded">{post.category}</span>
        {#if post.acceptedServiceProviderId}
          <span
            class="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
          >
            Accepted
          </span>
        {/if}
      </div>

      {#if post?.video}
    <div class="mb-8">
      <h3 class="font-semibold text-gray-700 mb-3">Work Video</h3>
      <div class="relative aspect-video rounded-lg overflow-hidden mb-4">
        <video src={post.video} class="w-full h-full object-cover" controls />
      </div>
    </div>
    {/if}

      <div class="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 class="font-semibold text-gray-700 mb-2">Description</h3>
        <p class="text-gray-600 leading-relaxed">{post.description}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="text-sm text-gray-500">Budget</p>
          <p class="font-bold text-lg text-red-600">Rs. {post.price}</p>
        </div>
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="text-sm text-gray-500">Location</p>
          <p class="font-medium text-gray-700">{post?.address}</p>
        </div>
      </div>
    </div>

    

  

   

    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800">User Bids</h3>
        {#if currentUserId !== post.userId && !post.acceptedServiceProviderId}
          <button
            on:click={() => (showBidForm = !showBidForm)}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showBidForm ? "Cancel" : "Place Bid"}
          </button>
        {/if}
      </div>

      {#if showBidForm}
        <div class="bg-gray-50 p-5 rounded-lg mb-6">
          <h4 class="font-semibold text-lg mb-4">Submit Your Bid</h4>
          <form class="space-y-4">
            <div>
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Bid Amount (Rs.)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                bind:value={bidAmount}
                placeholder="Enter your bid amount"
              />
            </div>
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                bind:value={bidMessage}
                placeholder="Explain why you're the best fit"
              ></textarea>
            </div>
            <button
              type="button"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              on:click|preventDefault={() => handleBidSubmit()}
            >
              Submit Bid
            </button>
          </form>
        </div>
      {/if}

      {#if postData.bids && postData.bids.length > 0}
        <div class="space-y-3">
          {#each postData.bids as bid}
            <div
              class={`p-4 border rounded-lg ${
                post?.acceptedServiceProviderId === bid.serviceProviderId
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div class="flex justify-between items-start gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-medium text-gray-900"
                      >{bid.serviceProviderName}</span
                    >
                    {#if post?.acceptedServiceProviderId === bid.serviceProviderId}
                      <span
                        class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                      >
                        Accepted
                      </span>
                    {/if}
                  </div>
                  <p class="text-gray-600 text-sm mb-2">{bid.bidMessage}</p>
                  <p class="text-xs text-gray-400">
                    {new Date(bid.createdAt).toLocaleString()}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-blue-600">Rs. {bid.bidAmount}</p>
                  {#if !post?.acceptedServiceProviderId && post?.userId === currentUserId}
                    <button
                      class="mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                      on:click={() => acceptBid(bid)}
                    >
                      Accept
                    </button>
                  {/if}
                  {#if post?.acceptedServiceProviderId === bid.serviceProviderId && post?.userId === currentUserId && post?.deadline < twoDaysLater}
                    <button
                      class="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      on:click={() => completeWork(post.id)}
                    >
                      Mark Completed
                    </button>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-8 bg-gray-50 rounded-lg">
          <p class="text-gray-500">No bids available for this service yet.</p>
          {#if currentUserId !== post.userId && !showBidForm}
            <button
              on:click={() => (showBidForm = true)}
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Be the first to bid
            </button>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>