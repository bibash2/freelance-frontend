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
        },
        {
            path: '/dashboard/notifications',
            name: 'Notifications',
            icon: '🔔',
        }
    ];
    
    // Mobile menu state
    let mobileMenuOpen = false;
</script>

<nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo/Brand -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    YourBrand
                </a>
            </div>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-1">
                {#each routes as route}
                    <a
                        href={route.path}
                        class="{($page.url.pathname === route.path || $page.url.pathname.startsWith(route.path + '/')) 
                            ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg text-sm font-medium transition-all'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all'}"
                    >
                        {#if route.icon}
                            <span class="mr-2">{route.icon}</span>
                        {/if}
                        {route.name}
                    </a>
                {/each}
                
                <!-- Optional: User dropdown or CTA button -->
                <button class="ml-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                    Register As Service Provider
                </button>
            </div>
            
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button
                    on:click={() => mobileMenuOpen = !mobileMenuOpen}
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                    aria-expanded="false"
                >
                    <span class="sr-only">Open menu</span>
                    {#if mobileMenuOpen}
                        <!-- Close icon -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    {:else}
                        <!-- Menu icon -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    {/if}
                </button>
            </div>
        </div>
    </div>
    
    <!-- Mobile menu -->
    {#if mobileMenuOpen}
        <div class="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div class="px-2 pt-2 pb-3 space-y-1">
                {#each routes as route}
                    <a
                        href={route.path}
                        class="{($page.url.pathname === route.path || $page.url.pathname.startsWith(route.path + '/')) 
                            ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium'}"
                    >
                        {#if route.icon}
                            <span class="mr-2">{route.icon}</span>
                        {/if}
                        {route.name}
                    </a>
                {/each}
                
                <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <button class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                        Register As Service Provider
                    </button>
                </div>
            </div>
        </div>
    {/if}
</nav>

{@render children()}