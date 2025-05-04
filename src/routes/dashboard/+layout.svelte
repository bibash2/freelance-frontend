<script lang="ts">
    let { children } = $props();
    import { page } from '$app/stores';
    import Setting from './setting/+page.svelte';

    const routes = [
        {
            path: '/dashboard',
            name: 'Home',
            icon: '🏠'
        },
        {
            path: '/dashboard/setting',
            name: 'Settings',
            icon: '⚙️',
            component: Setting
        },
        {
            path: '/dashboard/profile',
            name: 'Profile',
            icon: '👤'
        }
    ];
    
    // Mobile menu state
    let mobileMenuOpen = $state(false);
</script>

<nav class="bg-red-50 dark:bg-gray-50 border-b-2 border-red-600 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Brand -->
        <div class="flex-shrink-0">
          <a href="/" class="text-2xl font-extrabold text-gray-800 dark:text-gray-900">
            <span class="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">YourBrand</span>
          </a>
        </div>
  
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-3">
          {#each routes as route}
            <a
              href={route.path}
              class="{($page.url.pathname === route.path || $page.url.pathname.startsWith(route.path + '/'))
                ? 'bg-red-600 text-white border-red-600'
                : 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white'} 
                border-2 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
            >
              {#if route.icon}
                <span class="mr-2">{route.icon}</span>
              {/if}
              {route.name}
            </a>
          {/each}
  
          <!-- Upgrade Button -->
          <button class="ml-2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition shadow-md border-2 border-red-600">
            Upgrade
          </button>
        </div>
  
        <!-- Mobile Toggle Button -->
        <div class="md:hidden">
          <button
            on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
            class="p-2 rounded-full text-red-600 border-2 border-red-600 hover:bg-red-100 transition"
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
      <div class="md:hidden bg-red-50 dark:bg-gray-100 border-t-2 border-red-600">
        <div class="px-4 py-4 space-y-3">
          {#each routes as route}
            <a
              href={route.path}
              class="{($page.url.pathname === route.path || $page.url.pathname.startsWith(route.path + '/'))
                ? 'bg-red-600 text-white border-red-600'
                : 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white'} 
                block border-2 px-4 py-2 rounded-full text-base font-medium flex items-center transition-colors"
            >
              {#if route.icon}
                <span class="mr-3">{route.icon}</span>
              {/if}
              {route.name}
            </a>
          {/each}
  
          <!-- CTA for mobile -->
          <div class="pt-4">
            <button class="w-full bg-red-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-700 transition shadow-md border-2 border-red-600">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    {/if}
  </nav>
  

{@render children()}