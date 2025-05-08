<script lang="ts">  
import WorkForCall from '$lib/component/workForCall.svelte';
let requestByMe=true;
export const workCallsToMe = [
  {
    id: 1,
    fromName: 'Ada Obi',
    message: 'Hi, I need a plumber urgently for a leaking pipe in Ikeja. Can you come today?',
    phone: '+234 701 222 3344',
    email: 'ada.obi@example.com',
    time: '10 mins ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  {
    id: 2,
    fromName: 'Michael Yusuf',
    message: 'I have a lighting issue in my apartment. Can you check it this evening?',
    phone: '+234 803 888 1122',
    email: '',
    time: '30 mins ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/men/38.jpg'
  },
  {
    id: 3,
    fromName: 'Ngozi Okafor',
    message: 'Looking for a carpenter to repair my wardrobe. Send your price estimate.',
    phone: '+234 805 442 8899',
    email: 'ngozi.okafor@gmail.com',
    time: '1 hour ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/women/52.jpg'
  },
  {
    id: 4,
    fromName: 'Tunde Balogun',
    message: 'Need urgent AC servicing before tomorrow. Can you do it?',
    phone: '+234 806 123 0098',
    email: '',
    time: '2 hours ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  {
    id: 5,
    fromName: 'Aisha Bello',
    message: 'Hello, I saw your profile on WorkConnect. I need house cleaning this weekend.',
    phone: '+234 809 321 7766',
    email: 'aisha.bello@email.com',
    time: 'Yesterday',
    consumerAvatar: 'https://randomuser.me/api/portraits/women/29.jpg'
  }
];

const workCallsByMe = [
  {
    id: 1,
    fromName: 'Ada Obi',
    message: 'Hi, I need a plumber urgently for a leaking pipe in Ikeja. Can you come today?',
    phone: '+234 701 222 3344',
    email: 'ada.obi@example.com',
    time: '10 mins ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/women/45.jpg'
  },
  {
    id: 2,
    fromName: 'Michael Yusuf',
    message: 'I have a lighting issue in my apartment. Can you check it this evening?',
    phone: '+234 803 888 1122',
    email: '',
    time: '30 mins ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/men/38.jpg'
  },
  {
    id: 3,
    fromName: 'Ngozi Okafor',
    message: 'Looking for a carpenter to repair my wardrobe. Send your price estimate.',
    phone: '+234 805 442 8899',
    email: 'ngozi.okafor@gmail.com',
    time: '1 hour ago',
    consumerAvatar: 'https://randomuser.me/api/portraits/women/52.jpg'
  }
];

</script>

<section class="py-10 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Direct Work Requests 
        <button 
        class="px-1 py-1 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        on:click={() => requestByMe = true}>
          By Me
        </button>
        <button class="px-1 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
        on:click={() => requestByMe = false}>
          To Me
        </button>
      </h2>
      <!-- Grid layout -->
       {#if requestByMe}
      <div class="grid gap-6 sm:grid-cols-8 lg:grid-cols-3">
        {#each workCallsByMe as call (call.id)}
          <WorkForCall {...call} type="requestedByMe" />
        {/each}
      </div>
      {:else}
      <div class="grid gap-6 sm:grid-cols-8 lg:grid-cols-3">
        {#each workCallsToMe as call (call.id)}
        <WorkForCall {...call} type="requestedToMe" />
        {/each}
      </div>
      {/if}
    </div>
  </section>
