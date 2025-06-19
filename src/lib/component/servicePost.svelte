<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const props = $props()
  const { id, title, description, price, imageUrl, userId, distance, address, video} = props;
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
    video,
    userId,
    distance,
    address, 
    
  });
};
console.log(userId,"userId", currentUserId, "currentUserId")
</script>


<div class="relative"
onclick={handleClick}
>
  <!-- Card Content -->
 <!-- Card Content -->
<div
  class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all cursor-pointer overflow-hidden"
>
  <!-- Image -->
  <video class="w-full h-44 object-cover" src={video}  />

  <!-- Content -->
  <div class="p-4 space-y-3">
    <!-- Title -->
    <h3 class="text-xl font-semibold text-gray-800">{title}</h3>

    <!-- Description -->
    <p class="text-sm text-gray-600 line-clamp-3">{description}</p>

    <!-- Info & Actions -->
    <div class="flex justify-between items-end flex-wrap gap-2">
      <!-- Left Info -->
      <div class="text-sm text-gray-500 space-y-1">
        {#if userId !== currentUserId}
          <p>{Number(distance?.toFixed(2))} km away</p>
          <p class="truncate w-40">{address}</p>
        {/if}
      </div>

      <!-- Price & Button -->
      <div class="text-right space-y-2">
        <div class="text-red-600 font-bold text-lg">Rs. {price}</div>
        {#if userId !== currentUserId}
          <button
            class="bg-red-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-red-700 transition shadow-sm">
            Bid Now
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>


  <!-- Expanded Details (shown when clicked) -->
</div>