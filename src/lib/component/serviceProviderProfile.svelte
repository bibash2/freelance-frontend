<script lang="ts">
  import { createEventDispatcher } from "svelte";
    export let name: string;
    export let category: string;
    export let phone: string;
    export let bio: string;
    export let profileImage: string;
    export let id: number;
    export let serviceProviderAddress: string;
    export let distance: number;
    export let image:any;
    const dispatch = createEventDispatcher();

    const handleClick = () => {
      dispatch('click', { 
        id,
        name,
        category,
        serviceProviderAddress,
        phone,
        bio,
        image,
        distance
      });
    };
  </script>
  
  <div class="bg-white rounded-lg shadow hover:shadow-lg border border-red-100 transition p-5 hover:scale-105 cursor-pointer"
  on:click={handleClick}>
    <div class="flex items-center space-x-4 mb-4">
      <img
        src={image}
        alt={name}
        class="w-16 h-16 rounded-full border-2 border-red-600 object-cover"
      />
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{name}</h3>
        <p class="text-sm text-red-600 font-medium">{category}</p>
      </div>
    </div>
  
    <div class="text-sm text-gray-600 space-y-2">
      <p><strong class="text-gray-800">📍 Location:</strong> {serviceProviderAddress}</p>
      <p><strong class="text-gray-800">📞 Phone:</strong> {phone}</p>
      <p><strong class="text-gray-800">📝 Bio:</strong> {bio}</p>
      <p><strong class="text-gray-800">Distance:</strong> {distance.toFixed(2)} km away</p>
    </div>
  </div>
  