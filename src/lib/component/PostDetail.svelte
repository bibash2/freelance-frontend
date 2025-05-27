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
    freelanceAxios.post('/bid', {
      bidAmount: bidAmount,
      bidMessage: bidMessage,
      postId: post.id,
    });
    showBidForm = false;
    bidAmount = '';
    bidMessage = '';
  }

  const dispatch = createEventDispatcher();
</script>

<div class="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
  {#if !post}
    <div class="text-center py-8">
      <p class="text-gray-500">No post details available</p>
    </div>
  {:else}
    <h2 class="text-2xl font-bold mb-2">{post.title}</h2>
    <img src={post.imageUrl} alt={post.title} class="w-full h-64 object-cover rounded-md mb-4" />
    <p class="text-gray-700 mb-2">{post.description}</p>
    <p class="text-lg text-red-600 font-semibold mb-6">Budget: Rs. {post.price}</p>

    <h3 class="text-xl font-bold mb-2">User Bids</h3>
    {#if postData.bids && postData.bids.length > 0}
      <ul class="space-y-4">
        {#each postData.bids as bid}
          <li class="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 relative">
            <div class="flex justify-between items-start">
              <div>
                <p><strong>User:</strong> {bid.user}</p>
                <p><strong>Bid Amount:</strong> Rs. {bid.amount}</p>
                <p><strong>Message:</strong> {bid.message}</p>
              </div>
              <button
                class="ml-4 px-3 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded"
                on:click={() => acceptBid(bid)}
              >
                Accept
              </button>
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
