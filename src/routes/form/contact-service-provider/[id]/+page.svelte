<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { freelanceAxios } from '$lib/action/axios.service';
  
    let title = '';
    let description = '';
    let datetime = '';
    let location = '';
    let budget = '';
    let workCallId = '';
  
    const serviceProviderId = $page.params.id;
    let showSuggestions = true;
    let locationSuggestions: string[] = [];

    const selectLocation = (loc: string) => {
    location = loc;
    showSuggestions = false;
    locationSuggestions = [];
  };
    
  
    const handleSubmit = async (event: Event) => {
      event.preventDefault();
  
      const formData = {
        title,
        description,
        datetime,
        location,
        serviceProviderId,
        budget,
        address: location
        
      };
      const response = await freelanceAxios.post("/contact-service-provider", formData);
      if(response?.data){
        workCallId = response?.data?.id;
        goto(`/dashboard/workRequest/${workCallId}_requestedByMe`);
      }
    };

    const fetchLocationRecommendations = async (location: string) => {
    try {
      console.log(location);
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
  
  <form on:submit|preventDefault={handleSubmit} class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6 mt-10">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        id="title"
        type="text"
        bind:value={title}
        required
        class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        id="description"
        bind:value={description}
        rows="5"
        required
        class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
  
    <div>
      <label for="datetime" class="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
      <input
        id="datetime"
        type="datetime-local"
        bind:value={datetime}
        required
        class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="budget" class="block text-sm font-medium text-gray-700 mb-1">Budget</label>
      <input
        id="budget"
        type="number"
        bind:value={budget}
        required
        class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  
    <div class="text-right">
      <button
        type="submit"
        class="bg-red-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </form>
  