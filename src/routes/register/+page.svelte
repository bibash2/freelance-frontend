<script lang="ts">
  import { goto } from "$app/navigation";
  import { freelanceAxios } from "$lib/action/axios.service";
  import axios from "axios";
  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let location = "";
  let showSuggestions = true;
  let locationSuggestions: string[] = [];

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const response = await freelanceAxios.post("/register", {
        name,
        email,
        password,
        location,
      });
      if (response.data.success) {
        goto("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectLocation = (loc: string) => {
    location = loc;
    showSuggestions = false;
    locationSuggestions = [];
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

<section class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

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
        <label class="block mb-1 text-sm font-medium text-gray-700">Email</label
        >
        <input
          type="email"
          bind:value={email}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          bind:value={password}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700"
          >Confirm Password</label
        >
        <input
          type="password"
          bind:value={confirmPassword}
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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


      <button
        type="submit"
        on:click={handleRegister}
        class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
      >
        Register
      </button>
    </form>

    <p class="mt-4 text-sm text-center">
      Already have an account?
      <a href="/login" class="text-red-600 hover:underline">Log in</a>
    </p>
  </div>
</section>
