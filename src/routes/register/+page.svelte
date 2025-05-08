<script lang="ts">
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let location = '';
  
    const handleRegister = () => {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
  navigator.geolocation.getCurrentPosition(
   function(position) {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  function(error) {
    console.error("Error getting location:", error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);
    };
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>
      
      <form on:submit|preventDefault={handleRegister} class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input type="text" bind:value={name} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input type="email" bind:value={email} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input type="password" bind:value={password} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>            

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" bind:value={confirmPassword} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" bind:value={confirmPassword} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
  
        <button type="submit" on:click={handleRegister} class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
          Register
        </button>
      </form>
  
      <p class="mt-4 text-sm text-center">
        Already have an account? 
        <a href="/login" class="text-red-600 hover:underline">Log in</a>
      </p>
    </div>
  </section>
  