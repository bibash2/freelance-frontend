<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const props = $props()
  const { id, title, description, price, imageUrl, userId } = props;
  const dispatch = createEventDispatcher();
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let currentUserId = $state();

  onMount(() => {
    currentUserId = browser ? JSON.parse(localStorage.getItem("userDetail") || '{}').id : null;
  })

const handleClick = () => {
  dispatch('click', { 
    id,
    title,
    description,
    price,
    imageUrl,
    userId
  });
};
console.log(userId,"userId", currentUserId, "currentUserId")
</script>


<div class="relative"
onclick={handleClick}
>
  <!-- Card Content -->
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden hover:scale-105 cursor-pointer"
  >
    <img class="w-full h-44 object-cover" src={imageUrl} alt={title} />

    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800">{title}</h3>
      <p class="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>

      <div class="mt-4 flex justify-between items-center">
        <span class="text-red-600 font-bold">Rs. {price}</span>
        {#if userId !== currentUserId}
        <button
          class="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
          onclick={() => {
            // Handle bid/booking directly here if needed
            console.log('Bid clicked for', title);
          }}
        >
          Bid Now
        </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Expanded Details (shown when clicked) -->
</div>