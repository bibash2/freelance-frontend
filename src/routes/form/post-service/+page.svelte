<script lang="ts">
  import AddressAutocomplete from '$lib/component/autoCompleteAddress.svelte';
  import { freelanceAxios } from '$lib/action/axios.service';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/utils/toast';

  // Form fields
  let description = '';
  let address = ''; // This will likely be populated by AddressAutocomplete
  let location: string | null = $state(null); // This is bound to your custom text input
  let phone = '';
  let category = '';
  let urgency = '';
  let title = '';
  let price = 0;

  // Location suggestions (for your custom autocomplete logic)
  let showSuggestions = true;
  let locationSuggestions: string[] = $state([]);
  const categories = ['Plumber', 'Electrician', 'Carpenter', 'Mechanic'];
  const currentUser: any = $state(localStorage.getItem('userDetails'));

  // File upload state (now for direct inclusion in create-post)
  let uploadProgress = $state(0); // Renamed from uploadProgress for clarity in overall submission
  let uploadError = $state<string | null>(null);
  let isSubmitting = $state(false); // Renamed from isUploading to reflect overall form submission
  let selectedFile: File | null = $state(null);

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    selectedFile = input.files?.[0] || null;
    uploadError = null; // Clear any previous error when a new file is selected
    uploadProgress = 0; // Reset progress bar
  };

  // Location Autocomplete Logic (from your original code)
  const selectLocation = (loc: string) => {
    location = loc;
    showSuggestions = false; // Hide suggestions after selection
    locationSuggestions = []; // Clear suggestions
  };

  const fetchLocationRecommendations = async (inputLocation: string) => {
    if (!inputLocation || inputLocation.length < 3) {
      locationSuggestions = [];
      return;
    }

    try {
      const response = await freelanceAxios.post(`/get-suggest-location/${inputLocation}`);
      locationSuggestions = response.data;
    } catch (error) {
      toast.error("Error fetching location suggestions.");
      locationSuggestions = [];
    }
  };

  // Effect to trigger location suggestions when `location` changes
  $effect(() => {
    if (location) {
      fetchLocationRecommendations(location);
    }
  });

  // --- Main form submission logic ---
  async function handleSubmit(event: Event) {
    event.preventDefault();

    // Basic validation for all required text fields
    if (!title || !description || !price || !location || !phone || !category || !urgency) {
      toast.error("Please fill all required fields.");
      return; // Stop form submission
    }

    // Client-side validation for video file (if selected)
    if (selectedFile) {
        if (!selectedFile.type.startsWith("video/")) {
            const msg = "Please select a valid video file (MP4, MOV, etc.).";
            uploadError = msg;
            toast.error(msg);
            return;
        }
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (selectedFile.size > maxSize) {
            const msg = "File size must be less than 100MB.";
            uploadError = msg;
            toast.error(msg);
            return;
        }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address); // Ensure this `address` is populated correctly
    formData.append('location', location || ''); // Append location (empty string if null)
    formData.append('phone', phone);
    formData.append('category', category);
    formData.append('urgency', urgency);
    formData.append('price', price.toString());
    if (selectedFile) {
      formData.append('video', selectedFile); // Append the video file
    }

    try {
      isSubmitting = true;
      uploadError = null; // Clear any previous error
      uploadProgress = 0; // Reset progress

      const response = await freelanceAxios.post("/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Crucial for sending files
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        },
      });

      if (response.data) {
        toast.success("Service post created successfully!");
        goto("/dashboard"); // Redirect on success
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create service post. Please try again.");
      uploadError = "Failed to create post. Please try again."; // General error message for the UI
    } finally {
      isSubmitting = false;
      // Optional: Clear form fields after submission attempt (success or failure)
      // description = '';
      // address = '';
      // location = null;
      // phone = '';
      // category = '';
      // urgency = '';
      // title = '';
      // price = 0;
      // selectedFile = null;
    }
  }
</script>

---

<section class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Create Service Post</h2>
      <p class="text-gray-600 mt-2">Fill out the form to post your service request</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title*</label>
        <input
          bind:value={title}
          required
          placeholder="e.g., Need a plumber for leaky faucet"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description*</label>
        <textarea
          bind:value={description}
          required
          rows={4}
          placeholder="Describe your service needs in detail..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)*</label>
        <input
          type="number"
          bind:value={price}
          required
          min="0"
          placeholder="Enter your budget"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Location*</label>
        <input
          type="text"
          bind:value={location}
          required
          placeholder="Enter your location"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {#if showSuggestions && locationSuggestions.length > 0}
          <ul class="mt-1 border border-gray-200 rounded-md bg-white shadow-lg max-h-60 overflow-auto">
            {#each locationSuggestions as loc (loc)}
              <li
                class="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                on:click={() => selectLocation(loc)}
              >
                {loc}
              </li>
            {/each}
          </ul>
        {/if}
        </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
        <input
          type="tel"
          bind:value={phone}
          required
          placeholder="Enter 10-digit phone number"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Urgency*</label>
        <select
          bind:value={urgency}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="" disabled selected>Select urgency level</option>
          <option value="immediate">Immediate (within hours)</option>
          <option value="moderate">Moderate (1-2 days)</option>
          <option value="low">Low (flexible timing)</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category*</label>
        <select
          bind:value={category}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="" disabled selected>Select service category</option>
          {#each categories as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>

      <div class="border border-gray-200 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Upload Work Video (Optional)</h3>
        <div class="space-y-4">
          <div>
            <label class="flex-1">
              <span class="sr-only">Choose video file</span>
              <input
                type="file"
                accept="video/*"
                on:change={handleFileChange}
                class="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                disabled={isSubmitting} />
            </label>
          </div>

          {#if selectedFile}
            <div class="text-sm text-gray-600">
              Selected: **{selectedFile.name}** ({Math.round(selectedFile.size / 1024)} KB)
            </div>
          {/if}

          {#if isSubmitting}
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                style={`width: ${uploadProgress}%`}
              ></div>
            </div>
            <div class="text-sm text-gray-600 text-center">{uploadProgress}% uploaded</div>
          {/if}

          {#if uploadError}
            <div class="text-sm text-red-600">{uploadError}</div>
          {/if}
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        disabled={isSubmitting} >
        {isSubmitting ? 'Creating Post...' : 'Create Service Post'}
      </button>
    </form>
  </div>
</section>