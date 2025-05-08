<script lang="ts">
    import AddressAutocomplete from '$lib/component/autoCompleteAddress.svelte';
  
    let description = '';
    let address = '';
    let location: any = null;
    let phone = '';
    let category = '';
    const categories = ['Plumber', 'Electrician', 'Carpenter', 'Mechanic'];
  
    function handleSubmit(event: Event) {
      event.preventDefault();
      const data = {
        description,
        address,
        location,
        phone,
        category
      };
  
      console.log('Form submitted:', data);
    }
  
    function handleAddressSelect(event: CustomEvent<{ address: string; location: any }>) {
      address = event.detail.address;
      location = event.detail.location;
    }
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Create Service Post</h2>
  
      <form on:submit|preventDefault={handleSubmit} class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            bind:value={description}
            required
            rows="3"
            placeholder="Describe your service..."
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Address</label>
          <AddressAutocomplete on:select={handleAddressSelect} />
          {#if address}
            <p class="mt-1 text-sm text-gray-500">{address}</p>
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
  
        <button
          type="submit"
          class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Create Service Post
        </button>
      </form>
    </div>
  </section>
  