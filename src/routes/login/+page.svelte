<script lang="ts">
    let email = '';
    let password = '';
  
    const handleLogin = () => {
      console.log({ email, password });
    };
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input type="email" bind:value={email} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
  
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input type="password" bind:value={password} required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
  
        <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
          Log In
        </button>
      </form>
  
      <p class="mt-4 text-sm text-center">
        Don't have an account? 
        <a href="/register" class="text-red-600 hover:underline">Register</a>
      </p>
    </div>
  </section>
  