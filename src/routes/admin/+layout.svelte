<script lang="ts">
    import { freelanceAxios } from "$lib/action/axios.service";
    import { onMount } from "svelte";

    // Sample data - replace with your actual data source
    let pendingServiceProviders = $state<any>([]);
    onMount(async () => {
        const response = await freelanceAxios.get('/admin/pending-service-providers');
        pendingServiceProviders = response.data;
    });
  
    // Action handlers
    function approveProvider(id: string) {
     pendingServiceProviders = pendingServiceProviders.filter((p: any)=> p.id !== id);
     freelanceAxios.post(`/admin/approve-provider/${id}`);

    }
  
    function rejectProvider(id: string) {
      pendingServiceProviders = pendingServiceProviders.filter((p: any)=> p.id !== id);
      freelanceAxios.post(`/admin/reject-provider/${id}`);
    }

  </script>
  
  <section class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Pending Service Providers</h2>
      
      {#if pendingServiceProviders.length === 0}
        <p class="text-gray-500">No pending service providers at this time.</p>
      {:else}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each pendingServiceProviders as provider (provider.id)}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img 
                          class="h-10 w-10 rounded-full" 
                          src={provider.avatar || '/default-avatar.png'} 
                          alt={provider.name}
                        >
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{provider.name}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.category}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        onclick={() => approveProvider(provider.id)}
                        class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                      >
                        Accept
                      </button>
                      <button 
                        onclick={() => rejectProvider(provider.id)}
                        class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </section>
  
  <style>
    /* Add any custom styles here */
  </style>