<script lang="ts">
    export let fromName: string;
    export let message: string;
    export let phone: string;
    export let email: string = '';
    export let time: string;
    export let consumerAvatar: string = 'https://randomuser.me/api/portraits/men/35.jpg';
    export let isOnline: boolean = false;
    export let isNew: boolean = true;
    export let type: string = 'requestedByMe';
  
    // Dynamic color classes based on type
    let colorClasses = {
      bgFrom: 'from-white',
      bgTo: 'to-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      bg: 'bg-red-100'
    };
  
    $: {
      if (type === 'requestedByMe') {
        colorClasses = {
          bgFrom: 'from-white',
          bgTo: 'to-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          bg: 'bg-green-100'
        };
      } else {
        colorClasses = {
          bgFrom: 'from-white',
          bgTo: 'to-red-50',
          border: 'border-red-200',
          text: 'text-re-600',
          bg: 'bg-red-100'
        };
      }
      // Add more types as needed
    }
  </script>
  
  <div class={`rounded-xl bg-gradient-to-br ${colorClasses.bgFrom} ${colorClasses.bgTo} border ${colorClasses.border} shadow-sm hover:shadow-md transition-all duration-300 p-6 transform hover:-translate-y-1 hover:cursor-pointer`}>
    <div class="flex items-start gap-4 h-full">
      <!-- Avatar with status indicator -->
      <div class="relative flex-shrink-0">
        <img
          src={consumerAvatar}
          alt={fromName}
          class="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
        />
        {#if isOnline}
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        {:else}
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
        {/if}
      </div>
  
      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
          <div>
            <h3 class="text-lg font-bold text-gray-900 truncate">{fromName}</h3>
            {#if isNew}
              <p class={`text-xs font-medium ${colorClasses.text} ${colorClasses.bg} px-2 py-0.5 rounded-full inline-block`}>
                New Message
              </p>
            {/if}
          </div>
          <span class="text-xs text-gray-500 whitespace-nowrap">{time}</span>
        </div>
  
        <!-- Message bubble -->
        <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-xs mb-3">
          <p class="text-gray-800 text-sm">{message}</p>
        </div>
  
        <!-- Contact info -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <div class={`w-6 h-6 rounded-full ${colorClasses.bg} flex items-center justify-center ${colorClasses.text}`}>
              📞
            </div>
            <a href={`tel:${phone}`} class={`text-gray-700 hover:${colorClasses.text} hover:underline`}>
              {phone}
            </a>
          </div>
          
          {#if email}
            <div class="flex items-center gap-2 text-sm">
              <div class={`w-6 h-6 rounded-full ${colorClasses.bg} flex items-center justify-center ${colorClasses.text}`}>
                ✉️
              </div>
              <a href={`mailto:${email}`} class={`text-gray-700 hover:${colorClasses.text} hover:underline truncate`}>
                {email}
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>