<script lang="ts">
    import { io, type Socket } from 'socket.io-client';
    import { onMount } from 'svelte';
    import { freelanceAxios } from '$lib/action/axios.service';

    // Types
    interface Message {
        id: string;
        sender: 'provider' | 'consumer';
        text: string;
        time: string;
    }

    interface ServiceRequest {
        title: string;
        description: string;
        dateTime: string;
        address: string;
        budget?: string;
    }

    interface WorkCall {
        id: string;
        fromName: string;
        messages: Message[];
        phone: string;
        email?: string;
        consumerAvatar: string;
        isOnline: boolean;
        status: 'pending' | 'accepted' | 'rejected' | 'completed';
        serviceRequest: ServiceRequest;
    }

    interface SocketMessage {
        type: 'chat' | 'notification' | 'system';
        senderId: string;
        content: string;
        timestamp: string;
    }

    // Component state
    let workCall = $state<any | null>(null);
    let isLoading = $state(true);
    let error = $state<string | null>(null);
    let socket: Socket | null = null;
    let inputMessage = $state('');
    let isSubmitting = $state(false);
    let isConnected = $state(false);

    // Props
    const props = $props();
  const { type, id, user } = props;

    // Color classes based on type
    let colorClasses = $state({
        bgFrom: type === 'requestedByMe' ? 'from-white' : 'from-white',
        bgTo: type === 'requestedByMe' ? 'to-green-50' : 'to-red-50',
        border: type === 'requestedByMe' ? 'border-green-200' : 'border-red-200',
        text: type === 'requestedByMe' ? 'text-green-600' : 'text-red-600',
        bg: type === 'requestedByMe' ? 'bg-green-100' : 'bg-red-100',
        gradientFrom: type === 'requestedByMe' ? 'from-green-600' : 'from-red-600',
        gradientTo: type === 'requestedByMe' ? 'to-green-500' : 'to-red-500'
    });

    // Fetch work call details
    onMount(async () => {
        try {
            isLoading = true;
            const response = await freelanceAxios.get<WorkCall>(`/work-call/${id}`);
            workCall = response.data;
            initializeSocket();
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load work call details';
        } finally {
            isLoading = false;
        }
    });

    // Socket initialization
    function initializeSocket() {
        if (!workCall) return;

        socket = io('http://localhost:9000', {
            auth: {
                token: localStorage.getItem('token'),
                workCallId: workCall.id
            },
            reconnectionAttempts: 3,
            timeout: 5000
        });

        socket.on('connect', () => {
            isConnected = true;
            console.log('Connected with ID:', socket?.id);
        });

        socket.on('newMessage', (message: SocketMessage) => {
            if (!workCall) return;
            
            const newMessage: Message = {
                id: crypto.randomUUID(),
                sender: message.senderId === user.id ? 'consumer' : 'provider',
                text: message.content,
                time: new Date(message.timestamp).toLocaleTimeString()
            };

            workCall.messages = [...workCall.messages, newMessage];
        });

        socket.on('disconnect', () => {
            isConnected = false;
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }

    // Message sending
    const sendMessage = () => {
        if (!inputMessage.trim() || !socket || !workCall) return;
        
        isSubmitting = true;
        
        const messageData = {
            content: inputMessage,
            workCallId: workCall.id,
            timestamp: new Date().toISOString(),
            token: localStorage.getItem('token')
        };
        workCall.messages = [ messageData];
        console.log(messageData, 'messageData===================................>>>>>>>>>>>>>>>..');

        socket.emit('chatMessage', messageData, (ack: { success: boolean }) => {
            isSubmitting = false;
            if (ack?.success) {
                inputMessage = '';
            } else {
                error = 'Failed to send message';
            }
        });
    };

    // Request actions
    const handleAccept = async () => {
        isSubmitting = true;
        try {
            await freelanceAxios.patch(`/work-call/${id}/accept`);
            if (workCall) workCall.status = 'accepted';
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to accept request';
        } finally {
            isSubmitting = false;
        }
    };

    const handleReject = async () => {
        isSubmitting = true;
        try {
            await freelanceAxios.patch(`/work-call/${id}/reject`);
            if (workCall) workCall.status = 'rejected';
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to reject request';
        } finally {
            isSubmitting = false;
        }
    };
</script>

<!-- UI remains the same as your original template -->
{#if isLoading}
    <div class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
{:else if error}
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-red-50 text-red-600 rounded-xl">
        <p class="text-center">{error}</p>
    </div>
{:else if workCall}
    <div class={`max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border ${colorClasses.border} mt-10 mb-10`}>
        <!-- Header Section -->
        <div class={`bg-gradient-to-r ${colorClasses.gradientFrom} ${colorClasses.gradientTo} p-6 text-white`}>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <img 
                            class="w-16 h-16 rounded-full border-4 border-white/30 object-cover" 
                            src={workCall.consumerAvatar} 
                            alt={workCall.fromName}
                        />
                        <div class={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${isConnected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold">{user.name}</h1>
                        <div class="flex items-center space-x-2">
                            <span class="text-opacity-80">📞 {user.phone}</span>
                            {#if user.email}
                                <span class="text-opacity-80">✉️ {user.email}</span>
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

        <!-- Rest of your template remains the same -->
        <!-- ... -->
          <!-- Service Request Details -->
        <div class={`p-6 border-b ${colorClasses.border}`}>
            <h2 class="text-xl font-bold text-gray-800 mb-4">Service Request</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-semibold">{workCall.title}</h3>
                    <p class="text-gray-600 mt-2">{workCall.description}</p>
                </div>
                
                <div class="space-y-4">
                    <div class="flex items-start">
                        <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
                            📅
                        </div>
                        <div>
                            <div class="font-medium">Date & Time</div>
                            <div class="text-gray-600">
                                {workCall.date} at {workCall.time}
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-start">
                        <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
                            📍
                        </div>
                        <div>
                            <div class="font-medium">Location</div>
                            <div class="text-gray-600">{workCall.address}</div>
                        </div>
                    </div>
                    
                    {#if workCall.budget}
                        <div class="flex items-start">
                            <div class={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} mr-3`}>
                                💰
                            </div>
                            <div>
                                <div class="font-medium">Budget</div>
                                <div class="text-gray-600">Rs. {workCall.budget}</div>
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
{:else}
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 text-gray-600 rounded-xl">
        <p class="text-center">No work call details found</p>
    </div>
{/if}