<script lang="ts">
    import AddressAutocomplete from '$lib/component/autoCompleteAddress.svelte';
    import { freelanceAxios } from '$lib/action/axios.service';
    import { goto } from '$app/navigation';
  
    let description = '';
    let address = '';
    let location: any = null;
    let phone = '';
    let category = '';
    let urgency = '';
    let title = '';
    let price = 0;
    let showSuggestions = true;
    let locationSuggestions: string[] = [];
    const categories = ['Plumber', 'Electrician', 'Carpenter', 'Mechanic'];

    let file: File | null = null;
    let base64Image: string | null = null;
    let errorMessage: string | null = null;

    const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    file = target.files?.[0] ?? null;
    
    if (file) {
      console.log(file)
      const reader = new FileReader();
      reader.onload = () => {
        base64Image = reader.result as string;
        console.log(base64Image, "base64Image")
      };
      reader.onerror = (err) => {
        console.error('File reading error:', err);
        errorMessage = "Failed to process image";
      };
      reader.readAsDataURL(file);
    }
  };
  
   async function handleSubmit(event: Event) {
    
      event.preventDefault();
      const data = {
        title,
        description,
        address,
        location,
        phone,
        category,
        urgency,
        price,
        base64Image
      };
      const response = await freelanceAxios.post("/create-post", data);
      if(response.data){
        goto("/dashboard");
      }
  
   
    }
  
    const selectLocation = (loc: string) => {
    location = loc;
    showSuggestions = false;
    locationSuggestions = [];
  };

  const fetchLocationRecommendations = async (location: string) => {
    try {
      const response = await freelanceAxios.post(`/get-suggest-location/${location}`);
      locationSuggestions = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  $: if (location) {
    showSuggestions = true;
    locationSuggestions = [];
    fetchLocationRecommendations(location);
  }
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Create Service Post</h2>
  
      <form on:submit|preventDefault={handleSubmit} class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input
            bind:value={title}
            required
            placeholder="Title"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

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
          <label class="block mb-1 text-sm font-medium text-gray-700">Price</label>
          <input
            bind:value={price}
            required
            placeholder="Price"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Location</label
          >
          <input
            type="text"
            bind:value={location}
            required
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {#if (showSuggestions && locationSuggestions.length && location) }
            <ul
              class="mt-1 border rounded-md bg-white shadow-md max-h-40 overflow-auto"
            >
              {#each locationSuggestions as loc}
                <li
                  class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  on:click={() => selectLocation(loc)}
                >
                  {loc}
                </li>
              {/each}
            </ul>
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
          <label class="block mb-1 text-sm font-medium text-gray-700">Urgency</label>
          <select
            bind:value={urgency}
            required
            class="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled selected>Select urgency</option>
            <option value="immediate"> IMMEDIATE</option>
            <option value="moderate">MODERATE</option>
            <option value="low">LOW</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Image</label>
          <input type="file" bind:value={file} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          on:change={handleFileUpload} />
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
  