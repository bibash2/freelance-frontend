<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { freelanceAxios } from '$lib/action/axios.service';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const props = $props<{ postData: { postDetail: any; bids: any[] } }>();
  const { postData } = props;
  const {postDetail:post,bids} = postData;
  
  let showBidForm = $state(false);
  let bidAmount = $state('');
  let bidMessage = $state('');
  let currentUserId = $state();
  const acceptBid = (bid: any) => {
    freelanceAxios.post('/accept-bid', {
      bidId: bid.id,
      postId: post.id,
      serviceProviderId: bid.serviceProviderId,
    });
  }

  onMount(() => {
    if(browser){
      currentUserId = (JSON.parse(localStorage.getItem("userDetail") || '{}')).id;
    }
  });

  const handleBidSubmit = () => {
    if(!bidAmount || !bidMessage){
      alert('Please enter bid amount and message');
      return;
    }
    const isGood = checkBidDifference(bidAmount, post.price)
    if(!isGood)alert('Invalid bid: amount must not exceed ±20% of the budget.');

    freelanceAxios.post('/bid', {
      bidAmount: bidAmount,
      bidMessage: bidMessage,
      postId: post.id,
    });
    showBidForm = false;
    bidAmount = '';
    bidMessage = '';
  }
const checkBidDifference = (bidAmount:any, budget:any) => {
  const threshold = budget * 0.2; // 20% of the budget

  if (bidAmount >=  budget + threshold) {
    return true; // more than 20% above budget
  } else if (bidAmount < budget - threshold) {
    return false; // more than 20% below budget
  } else if(bidAmount === budget + threshold){
    return true;
  }else{
    return false
  }
};

  const dispatch = createEventDispatcher();
</script>

<div class="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
  {#if !post}
    <div class="text-center py-8">
      <p class="text-gray-500">No post details available</p>
    </div>
  {:else}
<div class="bg-white shadow-lg rounded-xl overflow-hidden p-6 space-y-6">
  <!-- Title -->
  <h2 class="text-2xl md:text-3xl font-bold text-gray-800">{post.title}</h2>

  <!-- Image -->
  <img 
    src={post.image} 
    alt={post.title} 
    class="w-full h-64 object-cover rounded-lg"
  />

  <!-- Description -->
  <p class="text-base text-gray-700 leading-relaxed">
    {post.description}
  </p>

  <!-- Info Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-base font-medium">
    <div class="text-red-600">
      <span class="font-semibold">Budget:</span> Rs. {post.price}
    </div>
    <div class="text-red-600 md:text-right">
      <span class="font-semibold">Category:</span> {post.category}
    </div>
  </div>

  <!-- Address (small and subtle) -->
  <div class="text-sm text-gray-500 italic">
    <span class="font-semibold not-italic">Address:</span> {post?.address}
  </div>
</div>




    <h3 class="text-xl font-bold mb-2">User Bids</h3>
    {#if postData.bids && postData.bids.length > 0}
      <ul class="space-y-4">
        {#each postData.bids as bid}

      <li class="p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition relative">
  <div class="flex justify-between items-start">
    <!-- Left content -->
    <div class="space-y-2">
      <p class="text-sm text-gray-600">
        <strong class="text-gray-800">User:</strong> {bid.serviceProviderName}
      </p>
      <p class="text-sm text-gray-600">
        <strong class="text-gray-800">Message:</strong> {bid.bidMessage}
      </p>
    </div>

    <!-- Right content -->
    <div class="text-right space-y-2">
      <!-- Created At -->
      <p class="text-xs text-gray-400">{new Date(bid.createdAt).toLocaleString()}</p>

      <!-- Bid Amount -->
      <p class="text-sm text-gray-700">
        <strong class="text-gray-800">Bid:</strong> Rs. {bid.bidAmount}
      </p>

      <!-- Accept button -->
      {#if !post?.acceptedServiceProviderId && post?.userId === currentUserId}
        <button
          class="mt-2 px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm transition"
          on:click={() => acceptBid(bid)}
        >
          Accept
        </button>
      {/if}
    </div>
  </div>
</li>

        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No bids available for this service yet.</p>
    {/if}

    {#if showBidForm}
      <div class="mt-6">
        <h3 class="text-xl font-bold mb-2">Bid Form</h3>
        <form>
          <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-gray-700">Bid Amount</label>
            <input type="number" id="amount" name="amount" class="mt-1 p-2 border border-gray-300 rounded-md w-full" bind:value={bidAmount}/>
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" class="mt-1 p-2 border border-gray-300 rounded-md w-full" bind:value={bidMessage}></textarea>
          </div>
          {#if currentUserId !== post.userId}
            <button type="submit" class="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              on:click|preventDefault={() => handleBidSubmit()}>Submit Bid</button>
          {/if}
        </form>
      </div>
    {/if}
    {#if currentUserId !== post.userId}
      <button
        on:click={() => showBidForm = !showBidForm}
        class="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        {showBidForm ? 'Cancel' : 'Bid Now'}
      </button>
    {/if}
  {/if}
</div>
