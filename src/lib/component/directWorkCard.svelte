<script lang="ts">
    export let fromName: string;
    export let message: string;
    export let phone: string;
    export let email: string = '';
    export let time: string; // e.g., "5 mins ago"
    export let consumerAvatar: string = 'https://randomuser.me/api/portraits/men/35.jpg'; // fallback avatar
  </script>
  
  <div class="bg-white border border-red-100 rounded-lg shadow p-5 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 hover:shadow-md transition">
    <img
      src={consumerAvatar}
      alt={fromName}
      class="w-14 h-14 rounded-full border-2 border-red-600 object-cover"
    />
  
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-800">{fromName}</h3>
        <span class="text-xs text-gray-500">{time}</span>
      </div>
      <p class="text-sm text-gray-600 mt-1">{message}</p>
  
      <div class="mt-3 space-y-1 text-sm text-gray-700">
        <p><strong class="text-gray-800">📞 Phone:</strong> {phone}</p>
        {#if email}
          <p><strong class="text-gray-800">📧 Email:</strong> {email}</p>
        {/if}
      </div>
    </div>
  </div>
  