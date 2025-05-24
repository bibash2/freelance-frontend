<script lang="ts">

    import { io } from 'socket.io-client';
    import { onMount } from 'svelte';
    let serviceProviderId = '';


    // export let workCall: {
    //   id: string;
    //   fromName: string;
    //   messages: {
    //     id: string;
    //     sender: 'provider' | 'consumer';
    //     text: string;
    //     time: string;
    //   }[];
    //   phone: string;
    //   email?: string;
    //   consumerAvatar: string;
    //   isOnline: boolean;
    //   status: 'pending' | 'accepted' | 'rejected' | 'completed';
    //   serviceRequest: {
    //     title: string;
    //     description: string;
    //     date: string;
    //     time: string;
    //     address: string;
    //     budget?: string;
    //   };
    // };
    const workCall = {
  id: "12345",
  fromName: "John Smith",
  messages: [
    {
      id: "1",
      sender: "consumer",
      text: "Hello, I need help with a leaking pipe in my kitchen",
      time: "10:30 AM"
    },
    {
      id: "2",
      sender: "provider",
      text: "Hi John, I can help with that. When would be a good time?",
      time: "10:35 AM"
    },
    {
      id: "3",
      sender: "consumer",
      text: "Would tomorrow afternoon work for you? Around 2 PM?",
      time: "10:40 AM"
    }
  ],
  phone: "+234 701 234 5678",
  email: "john.smith@example.com",
  consumerAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
  isOnline: true,
  status: "pending",
  serviceRequest: {
    title: "Kitchen Pipe Repair",
    description: "The pipe under the kitchen sink is leaking badly. Need immediate help to fix it before it causes water damage.",
    date: "2023-06-15",
    time: "2:00 PM",
    address: "123 Main Street, Lagos",
    budget: "5000"
  }
};
  let socket: any;
  export let type:string;
  
    //  const props = $props();
    //  const { type } = props;
    // Dynamic color classes based on type
    let colorClasses = {
      bgFrom: 'from-white',
      bgTo: 'to-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      bg: 'bg-red-100',
      gradientFrom: 'from-red-600',
      gradientTo: 'to-red-500'
    };
  
    $: {
      if (type === 'requestedByMe') {
        colorClasses = {
          bgFrom: 'from-white',
          bgTo: 'to-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          bg: 'bg-green-100',
          gradientFrom: 'from-green-600',
          gradientTo: 'to-green-500'
        };
      } else {
        colorClasses = {
          bgFrom: 'from-white',
          bgTo: 'to-red-50',
          border: 'border-red-200',
          text: 'text-red-600',
          bg: 'bg-red-100',
          gradientFrom: 'from-red-600',
          gradientTo: 'to-red-500'
        };
      }
    }
  
    let inputMessage = '';
    let isSubmitting = false;
  
    const handleAccept = async () => {
      isSubmitting = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      workCall.status = 'accepted';
      isSubmitting = false;
    };
  
    const handleReject = async () => {
      isSubmitting = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      workCall.status = 'rejected';
      isSubmitting = false;
    };

    onMount(() => {
    // Connect to Socket.IO server
    socket = io('http://localhost:9000');

    socket.on('connect', () => {
      console.log('Connected with ID:', socket.id);
    });

    socket.on('message', (data: any) => {
      workCall.messages = [...workCall.messages, data];
      
      // Update users list for notifications
      // if (data.type === 'notification') {
      //   if (data.message.includes('joined')) {
      //     users = [...users, data.message.split(' ')[1]];
      //   } else if (data.message.includes('left')) {
      //     users = users.filter(user => user !== data.message.split(' ')[1]);
      //   }
      // }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      if (socket) socket.disconnect();
    };
  });

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      console.log('Sending message:', inputMessage);
      socket.emit('chatMessage', { message: inputMessage, token: localStorage.getItem('token'), workCallId: serviceProviderId });
      inputMessage = '';
    }
  };
</script>
  
  <div class={`max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border ${colorClasses.border} mt-10 mb-10`}>
    <!-- Header Section with dynamic gradient -->
    <div class={`bg-gradient-to-r ${colorClasses.gradientFrom} ${colorClasses.gradientTo} p-6 text-white`}>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <img 
              class="w-16 h-16 rounded-full border-4 border-white/30 object-cover" 
              src={workCall.consumerAvatar} 
              alt={workCall.fromName}
            />
            {#if workCall.isOnline}
              <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            {/if}
          </div>
          <div>
            <h1 class="text-2xl font-bold">{workCall.fromName}</h1>
            <div class="flex items-center space-x-2">
              <span class="text-opacity-80">📞 {workCall.phone}</span>
              {#if workCall.email}
                <span class="text-opacity-80">✉️ {workCall.email}</span>
              {/if}
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-opacity-80">Status</div>
          <div class="text-lg font-semibold capitalize">{workCall.status}</div>
        </div>
      </div>
    </div>
  
    <!-- Service Request Details -->
    <div class={`p-6 border-b ${colorClasses.border}`}>
      <h2 class="text-xl font-bold text-gray-800 mb-4">Service Request</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold">{workCall.serviceRequest.title}</h3>
          <p class="text-gray-600 mt-2">{workCall.serviceRequest.description}</p>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
              📅
            </div>
            <div>
              <div class="font-medium">Date & Time</div>
              <div class="text-gray-600">
                {workCall.serviceRequest.date} at {workCall.serviceRequest.time}
              </div>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
              📍
            </div>
            <div>
              <div class="font-medium">Location</div>
              <div class="text-gray-600">{workCall.serviceRequest.address}</div>
            </div>
          </div>
          
          {#if workCall.serviceRequest.budget}
            <div class="flex items-start">
              <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
                💰
              </div>
              <div>
                <div class="font-medium">Budget</div>
                <div class="text-gray-600">Rs. {workCall.serviceRequest.budget}</div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  
    <!-- Message History -->
    <div class={`p-6 border-b ${colorClasses.border}`}>
      <h2 class="text-xl font-bold text-gray-800 mb-4">Message History</h2>
      
      <div class="space-y-4 max-h-96 overflow-y-auto p-2">
        {#each workCall.messages as message}
          <div class={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}>
            <div class={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'provider' ? colorClasses.bg + ' text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
              <p>{message.text}</p>
              <div class="text-xs text-gray-500 mt-1 text-right">{message.time}</div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- New Message Input -->
      <div class="mt-6 flex items-center">
        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Type your message..."
          class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          on:keydown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          on:click={sendMessage}
          class={`bg-${type === 'requestedByMe' ? 'green' : 'red'}-600 text-white px-4 py-2 rounded-r-lg hover:bg-${type === 'requestedByMe' ? 'green' : 'red'}-700 transition`}
        >
          Send
        </button>
      </div>
    </div>
  
    <!-- Action Buttons -->
    {#if workCall.status === 'pending'}
      <div class="p-6 flex justify-end space-x-4">
        <button
          on:click={handleReject}
          disabled={isSubmitting}
          class={`px-6 py-2 border ${type === 'requestedByMe' ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-600 text-red-600 hover:bg-red-50'} rounded-lg transition disabled:opacity-50`}
        >
          {isSubmitting ? 'Processing...' : 'Reject'}
        </button>
        <button
          on:click={handleAccept}
          disabled={isSubmitting}
          class={`px-6 py-2 ${type === 'requestedByMe' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition disabled:opacity-50`}
        >
          {isSubmitting ? 'Processing...' : 'Accept'}
        </button>
      </div>
    {:else}
      <div class="p-6 bg-gray-50">
        <div class={`px-4 py-2 rounded-lg text-center font-medium ${workCall.status === 'accepted' ? 'bg-green-100 text-green-800' : workCall.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          This request has been {workCall.status}
        </div>
      </div>
    {/if}
  </div>