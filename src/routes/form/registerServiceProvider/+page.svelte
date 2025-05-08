<script lang="ts">
    import AddressAutocomplete from '$lib/component/autoCompleteAddress.svelte';
  
    let name = '';
    let category = '';
    let location = '';
    let locationCoords: any = null;
    let phone = '';
    let bio = '';
  
    const categories = ['Plumber', 'Electrician', 'Carpenter', 'Mechanic', 'Cleaner'];
  
    function handleSubmit(event: Event) {
      event.preventDefault();
      const formData = {
        name,
        category,
        location,
        coordinates: locationCoords,
        phone,
        bio
      };
  
      console.log('Service provider registration:', formData);
      // Add your API call or backend logic here
    }
  
    function handleLocationSelect(event: CustomEvent<{ address: string; location: any }>) {
      location = event.detail.address;
      locationCoords = event.detail.location;
    }
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register as a Service Provider</h2>
  
      <form on:submit|preventDefault={handleSubmit} class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            bind:value={name}
            required
            placeholder="Your full name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            bind:value={category}
            required
            class="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled selected>Select a category</option>
            {#each categories as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Location</label>
          <AddressAutocomplete on:select={handleLocationSelect} />
          {#if location}
            <p class="mt-1 text-sm text-gray-500">{location}</p>
          {/if}
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            bind:value={phone}
            required
            placeholder="e.g. (123) 456-7890"
            pattern="[0-9+()\- ]{7}"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Bio / Description</label>
          <textarea
            bind:value={bio}
            required
            placeholder="Tell us about your skills, experience, and services..."
            rows="4"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
  
        <button
          type="submit"
          class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Register yourself as service Provider
        </button>
      </form>
    </div>
  </section>
  