<script lang="ts">
  import { goto } from "$app/navigation";
  import { freelanceAxios } from "$lib/action/axios.service";
  import type { AxiosError } from "axios";

  let name: string = "";
  let email: string = "";
  let password: string = "";
  let confirmPassword: string = "";
  let location: string = "";
  let showSuggestions: boolean = false;
  let locationSuggestions: string[] = [];
  let phone: string = "";
  let file: File | null = null;
  let base64Image: string | null = null;
  let isLoading: boolean = false;
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

  const handleRegister = async (event: Event) => {
    event.preventDefault();
    isLoading = true;
    errorMessage = null;

    if (password !== confirmPassword) {
      errorMessage = "Passwords don't match!";
      isLoading = false;
      return;
    }

    if (!file) {
      errorMessage = "Please upload an image";
      isLoading = false;
      return;
    }

    try {
      const response = await freelanceAxios.post("/register", {
        name,
        email,
        password,
        location,
        phone,
        base64Image,
      });

      if (response.data.success) {
        goto("/login");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      errorMessage = axiosError.response?.data?.message || "Registration failed. Please try again.";
      console.error("Registration error:", error);
    } finally {
      isLoading = false;
    }
  };

  const selectLocation = (loc: string) => {
    location = loc;
    showSuggestions = false;
  };

  const fetchLocationRecommendations = async (query: string) => {
    if (!query) {
      locationSuggestions = [];
      return;
    }

    try {
      const response = await freelanceAxios.post(`/get-suggest-location/${query}`);
      locationSuggestions = response.data;
      showSuggestions = locationSuggestions.length > 0;
    } catch (error) {
      console.error("Location suggestions error:", error);
      locationSuggestions = [];
    }
  };

  $: {
    if (location) {
      fetchLocationRecommendations(location);
    } else {
      locationSuggestions = [];
      showSuggestions = false;
    }
  }
</script>

<section class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

    {#if errorMessage}
      <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          bind:value={name}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          bind:value={email}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          bind:value={password}
          required
          minlength="8"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          bind:value={confirmPassword}
          required
          minlength="8"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          bind:value={phone}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          on:change={handleFileUpload}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
      </div>

      <div class="relative">
        <label class="block mb-1 text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          bind:value={location}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {#if showSuggestions && locationSuggestions.length > 0}
          <ul class="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md max-h-40 overflow-auto">
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

      <button
        type="submit"
        disabled={isLoading}
        class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>

    <p class="mt-4 text-sm text-center">
      Already have an account?
      <a href="/login" class="text-red-600 hover:underline">Log in</a>
    </p>
  </div>
</section>