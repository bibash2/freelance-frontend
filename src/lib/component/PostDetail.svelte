<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { freelanceAxios } from '$lib/action/axios.service';

  // export let service: {
  //   title: string;
  //   description: string;
  //   price: string;
  //   imageUrl: string;
  //   bids: {
  //     user: string;
  //     amount: string;
  //     message: string;
  //   }[];
  // };
  const service = $props()
  console.log(service, "dsfsdfsdfsdfdsf")
  let showBidForm = $state(false);
  let bidAmount = $state('');
  let bidMessage = $state('');


  const handleBidSubmit = () => {
  if(!bidAmount || !bidMessage){
    alert('Please enter bid amount and message');
    return;
  }
    freelanceAxios.post('/bid', {
      bidAmount: bidAmount,
      bidMessage: bidMessage,
      postId: service.id,
    });
    showBidForm = false;
    bidAmount = '';
    bidMessage = '';
  }


  const dispatch = createEventDispatcher();
</script>

<div class="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
  <h2 class="text-2xl font-bold mb-2">{service.title}</h2>
  <img src={service.imageUrl} alt={service.title} class="w-full h-64 object-cover rounded-md mb-4" />
  <p class="text-gray-700 mb-2">{service.description}</p>
  <p class="text-lg text-red-600 font-semibold mb-6">Price: Rs. {service.price}</p>

  <h3 class="text-xl font-bold mb-2">User Bids</h3>
  {#if service.bids && service.bids.length > 0}
    <ul class="space-y-4">
      {#each service.bids as bid}
        <li class="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
          <p><strong>User:</strong> {bid.user}</p>
          <p><strong>Bid Amount:</strong> Rs. {bid.amount}</p>
          <p><strong>Message:</strong> {bid.message}</p>
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
        <button type="submit" class="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        onclick={() => handleBidSubmit()}>Submit Bid</button>
      </form>
    </div>
  {/if}
  
    <button
      onclick={() => showBidForm = !showBidForm}
      class="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
    >
      {showBidForm ? 'Cancel' : 'Bid Now'}
    </button>


  
</div>
