<script lang="ts">
    import { goto } from '$app/navigation';
  let { children } = $props();
  import { page } from '$app/stores';
    import Button from '$lib/component/button.svelte';
    import { freelanceAxios } from '$lib/action/axios.service';
    import { browser } from '$app/environment';
    const handleLogout = () => {
      console.log("logout ========================>>>>>>>>>>>>>>>>>>>>>>>>>");
      if(browser){
        localStorage.clear();
        goto("/");
      }
    }
  
  const routes = [
    {
      path: '/dashboard',
      name: 'Explore',
      icon: '🌐',
      description: 'Browse all posts'
    },
    {
      path: '/dashboard/myPost',
      name: 'My Posts',
      icon: '📝',
      description: 'View your created posts'
    },
    {
      path: '/dashboard/workRequest',
      name: 'Work Requests',
      icon: '📨',
      description: 'Your direct work calls'
    },
    {
      path: '/dashboard/activity',
      name: 'Activity',
      icon: '📊',
      description: 'Activity'
    },
  ];
  
  // Mobile menu state
  let mobileMenuOpen = $state(false);
  let profileDropdownOpen = $state(false);
  let editProfileModalOpen = $state(false);
  
  // Sample user data
  let user = browser ? JSON.parse(localStorage.getItem("userDetail") || "{}") : {};
  
  // Editable fields
  let editableUser = {
    name: user.name,
    email: user.email,
    phone: user.phone
  };
  
  // Handle profile image change
  async function handleImageUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        user.avatar = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function saveProfile() {
    user.name = editableUser.name;
    user.email = editableUser.email;
    user.phone = editableUser.phone;
    editProfileModalOpen = false;
  }
</script>

<nav class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Brand Logo -->
      <div class="flex-shrink-0 flex items-center">
        <a href="/" class="text-xl font-bold">
          <span class="text-black">Market</span>
          <span class="text-red-600">Place</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        {#each routes as route}
          <a
            href={route.path}
            class="relative group px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors
              {$page.url.pathname === route.path 
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'}"
            title={route.description}
          >
            <span class="mr-2 text-lg">{route.icon}</span>
            {route.name}
      
            <!-- Tooltip -->
            <span class="absolute mt-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow z-50 whitespace-nowrap">
              {route.description}
            </span>
          </a>
        {/each}
      
        <!-- Profile Dropdown -->
        <div class="ml-4 relative">
          <button 
            on:click={() => profileDropdownOpen = !profileDropdownOpen}
            class="flex items-center text-sm rounded-full focus:outline-none"
          >
            <img class="h-8 w-8 rounded-full border border-gray-300" src={`${user.image}`} alt="User profile" />
          </button>
          
          <!-- Dropdown Menu -->
          {#if profileDropdownOpen}
            <div 
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              on:click|stopPropagation
            >
              <div class="py-1">
                <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  Signed in as <span class="font-medium">{user.email}</span>
                </div>
                <a 
                  href="/dashboard/profile" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <button 
                  on:click={() => { editProfileModalOpen = true; profileDropdownOpen = false; }}
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button 
                  on:click={() => { goto('/form/registerServiceProvider') }}
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Register As Service Provider
                </button>
                <button 
                  on:click={() => handleLogout()} 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Mobile Toggle Button -->
      <div class="md:hidden">
        <button
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Toggle menu</span>
          {#if mobileMenuOpen}
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div class="md:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        {#each routes as route}
          <a
            href={route.path}
            class="{$page.url.pathname === route.path
              ? 'text-red-600 border-l-4 border-red-600'
              : 'text-gray-700'} 
              block px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <span class="mr-3 text-lg">{route.icon}</span>
            <div>
              <div>{route.name}</div>
              <div class="text-xs text-gray-500">{route.description}</div>
            </div>
          </a>
        {/each}

        <!-- Mobile User Section -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex items-center px-3 py-2">
            <img class="h-8 w-8 rounded-full" src={user.avatar} alt="User profile" />
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-700">{user.name}</div>
              <button 
                on:click={() => { editProfileModalOpen = true; mobileMenuOpen = false; }}
                class="text-xs text-red-600 hover:underline"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>

<!-- Edit Profile Modal -->
{#if editProfileModalOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    on:click|stopPropagation={() => editProfileModalOpen = false}
  >
    <div 
      class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      on:click|stopPropagation
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Edit Profile</h3>
        <button 
          on:click={() => editProfileModalOpen = false}
          class="text-gray-400 hover:text-gray-500"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <!-- Profile Image Upload -->
        <div class="flex flex-col items-center">
          <img class="h-24 w-24 rounded-full mb-2" src={user.avatar} alt="Profile" />
          <label class="cursor-pointer">
            <span class="text-sm font-medium text-red-600 hover:underline">Change Photo</span>
            <input type="file" class="hidden" accept="image/*" on:change={handleImageUpload} />
          </label>
        </div>
        
        <!-- Form Fields -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            bind:value={editableUser.name}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            bind:value={editableUser.email}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            id="phone"
            type="tel"
            bind:value={editableUser.phone}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button
            on:click={() => editProfileModalOpen = false}
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            on:click={saveProfile}
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{@render children()}