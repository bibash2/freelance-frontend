<script lang="ts">
  import { freelanceAxios } from "$lib/action/axios.service";
  import { onMount } from "svelte";

  let pendingServiceProviders: any[] = [];
  let isLoading = true;
  let showCategorySection = false;
  let newCategory = '';
  let categories: any = [];

  onMount(async () => {
    const response = await freelanceAxios.get('/admin/pending-service-provider');
    pendingServiceProviders = response.data;
    isLoading = false;
  });

  function approveProvider(id: string) {
    pendingServiceProviders = pendingServiceProviders.filter(p => p.id !== id);
    freelanceAxios.post(`/admin/approve-service-provider`, {userId: id});
  }

  function rejectProvider(id: string) {
    pendingServiceProviders = pendingServiceProviders.filter(p => p.id !== id);
    freelanceAxios.post(`/admin/reject-service-provider`, {userId:id});
  }

  async function addCategory() {
    if (!newCategory.trim()) return;
    await freelanceAxios.post("/admin/add-category", { category: newCategory });
    newCategory = '';
    await loadCategories(); // Refresh category list
  }

  async function switchToCategorySection() {
    showCategorySection = true;
    await loadCategories();
  }

  async function loadCategories() {
    try {
      const res = await freelanceAxios.get('/admin/category');
      categories = res.data || [];
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  }
</script>


<section class="container mx-auto px-4 py-12">
  <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

  {#if showCategorySection}
    <!-- CATEGORY SECTION -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">Add New Category</h2>
      <div class="flex gap-4 mb-4">
        <input
          bind:value={newCategory}
          type="text"
          placeholder="Enter category"
          class="border p-2 rounded w-full"
        />
        <button
          on:click={addCategory}
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <h3 class="text-xl font-semibold mb-2 text-gray-700">Existing Categories:</h3>
      {#if categories.length > 0}
        <ul class="list-disc list-inside text-gray-600">
          {#each categories as category}
            <li>{category?.category}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500">No categories found.</p>
      {/if}
    </div>
  {/if}

  {#if isLoading}
    <p>Loading pending service providers...</p>
  {:else}
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Pending Service Providers</h2>
        <button
          on:click={switchToCategorySection}
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Category
        </button>
      </div>

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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each pendingServiceProviders as provider (provider.id)}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        class="h-10 w-10 rounded-full"
                        src={provider.image || '/default-avatar.png'}
                        alt={provider.name}
                      />
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{provider.name}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{provider.email}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{provider.category}</td>
                  <td class="px-6 py-4 text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        on:click={() => approveProvider(provider.id)}
                        class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        on:click={() => rejectProvider(provider.id)}
                        class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
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
  {/if}
</section>

