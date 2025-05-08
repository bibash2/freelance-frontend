<script lang="ts">
    export let item: any;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="bg-white p-6 rounded-md shadow-md">
    <h2 class="text-2xl font-bold mb-2">{item.title || item.name}</h2>
    <p class="mb-4">{item.description || item.bio}</p>
  
    {#if item.imageUrl || item.profileImage}
      <img src={item.imageUrl || item.profileImage} alt="Service Image" class="mb-4 rounded-md" />
    {/if}
  
    {#if item.price}
      <p class="text-lg font-semibold mb-2">Price: Rs. {item.price}</p>
    {/if}
  
    {#if item.location}
      <p class="mb-1"><strong>Location:</strong> {item.location}</p>
    {/if}
  
    {#if item.phone}
      <p><strong>Phone:</strong> {item.phone}</p>
    {/if}
  
    <button
      on:click={() => dispatch('close')}
      class="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
    >
      Back to List
    </button>
  </div>
  