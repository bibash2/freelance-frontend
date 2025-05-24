<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let title: string;
  export let description: string;
  export let price: string;
  export let imageUrl: string;
  export let id: number;
  const dispatch = createEventDispatcher();

const handleClick = () => {
  dispatch('click', { 
    id,
    title,
    description,
    price,
    imageUrl
  });
};
</script>


<div class="relative"
on:click={handleClick}
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
        <button
          class="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
          on:click|stopPropagation={() => {
            // Handle bid/booking directly here if needed
            console.log('Bid clicked for', title);
          }}
        >
          Bid Now
        </button>
      </div>
    </div>
  </div>

  <!-- Expanded Details (shown when clicked) -->
</div>