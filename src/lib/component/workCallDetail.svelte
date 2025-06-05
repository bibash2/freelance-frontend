// FIXED CLIENT-SIDE SOCKET IMPLEMENTATION (Svelte Component)
<script lang="ts">
    import { io, type Socket } from 'socket.io-client';
    import { onMount, onDestroy } from 'svelte';
    import { freelanceAxios } from '$lib/action/axios.service';

    // Types
    interface Message {
        id: string;
        senderId: string;
        content: string;
        createdAt: string;
        workCallId?: string;
    }

    interface SocketMessage {
        id: string;
        senderId: string;
        content: string;
        createdAt: string;
        workCallId?: string;
        timestamp: string;
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
        title: string;
        description: string;
        date: string;
        address: string;
        budget?: string;
    }

    // Component state
    let userDetail: any = $state();
    let workCall = $state<WorkCall | null>(null);
    let isLoading = $state(true);
    let error = $state<string | null>(null);
    let socket: Socket | null = null;
    let inputMessage = $state('');
    let isSubmitting = $state(false);
    let isConnected = $state(false);
    let isTyping = $state(false);
    let otherUserTyping = $state(false);
    let messagesContainer: HTMLElement;

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

    // Fetch work call details and initialize socket
    onMount(async () => {
        try {
            userDetail = JSON.parse(localStorage.getItem("userDetail") || "{}");
            isLoading = true;
            
            const response = await freelanceAxios.get<WorkCall>(`/work-call/${id}`);
            workCall = response.data;
            
            // Ensure messages array exists
            if (!workCall.messages) {
                workCall.messages = [];
            }
            
            initializeSocket();
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load work call details';
        } finally {
            isLoading = false;
        }
    });

    // Cleanup on component destroy
    onDestroy(() => {
        if (socket) {
            socket.disconnect();
        }
    });

    // Socket initialization with improved error handling
    function initializeSocket() {
        if (!workCall || !userDetail?.id) return;

        socket = io('http://localhost:9000', {
            auth: {
                token: localStorage.getItem('token'),
                userId: userDetail.id,
                workCallId: workCall.id
            },
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000
        });

        // Connection events
        socket.on('connect', () => {
            isConnected = true;
            console.log('Connected with ID:', socket?.id);
            
            // Authenticate after connection
            socket?.emit('authenticate', {
                token: localStorage.getItem('token'),
                userId: userDetail.id,
                workCallId: workCall?.id
            });
        });

        socket.on('connectionStatus', (data) => {
            console.log('Connection status:', data);
            isConnected = true;
        });

        socket.on('disconnect', () => {
            isConnected = false;
            console.log('Disconnected from server');
        });

        // Message events
        socket.on('newMessage', (message: SocketMessage) => {
            if (!workCall) return;
            
            console.log('Received new message:', message);
            
            // Create properly formatted message
            const newMessage: Message = {
                id: message.id || crypto.randomUUID(),
                senderId: message.senderId,
                content: message.content,
                createdAt: message.createdAt || message.timestamp,
                workCallId: message.workCallId
            };

            // Add message to the array if it doesn't already exist
            const messageExists = workCall.messages.some(m => m.id === newMessage.id);
            if (!messageExists) {
                workCall.messages = [...workCall.messages, newMessage];
                scrollToBottom();
            }
        });

        // Typing indicators
        socket.on('userTyping', (data: { userId: string; isTyping: boolean }) => {
            if (data.userId !== userDetail.id) {
                otherUserTyping = data.isTyping;
            }
        });

        // User presence events
        socket.on('userJoined', (data) => {
            console.log('User joined:', data);
        });

        socket.on('userLeft', (data) => {
            console.log('User left:', data);
        });

        // Status updates
        socket.on('statusUpdate', (data) => {
            if (workCall && data.workCallId === workCall.id) {
                workCall.status = data.status;
            }
        });

        // Error handling
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
            isConnected = false;
            error = 'Failed to connect to chat server';
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });
    }

    // Improved message sending with proper error handling
    const sendMessage = () => {
        if (!inputMessage.trim() || !socket || !workCall || !userDetail?.id) return;
        
        isSubmitting = true;
        const messageContent = inputMessage.trim();
        
        // Create temporary message for immediate display
        const tempMessage: Message = {
            id: `temp_${Date.now()}`,
            senderId: userDetail.id,
            content: messageContent,
            createdAt: new Date().toISOString(),
            workCallId: workCall.id
        };
        
        // Add temporary message to display immediately
        workCall.messages = [...workCall.messages];
        scrollToBottom();
        
        // DON'T clear input here - wait for acknowledgment
        
        // Prepare message data
        const messageData = {
            content: messageContent,
            senderId: userDetail.id,
            workCallId: workCall.id,
            createdAt: new Date().toISOString(),
            token: localStorage.getItem('token')
        };

        // Send message with acknowledgment
        socket.emit('chatMessage', messageData, (ack: { success: boolean; messageId?: string; error?: string }) => {
            {console.log(ack,"Received acknowledgment")}
            isSubmitting = false;
            
            if (ack?.success) {
                // Clear input only after successful acknowledgment
                inputMessage = '';
                
                // Replace temporary message with the real one
                if (ack.messageId) {
                    workCall.messages = workCall.messages.map(m => 
                        m.id === tempMessage.id 
                            ? { ...m, id: ack.messageId! }
                            : m
                    );
                }
                console.log('Message sent successfully');
            } else {
                // Remove temporary message on failure
                workCall.messages = workCall.messages.filter(m => m.id !== tempMessage.id);
                error = ack?.error || 'Failed to send message';
                
                // DON'T restore inputMessage here - it was never cleared
                // The message remains in the input field for the user to retry
                
                // Clear error after 3 seconds
                setTimeout(() => {
                    error = null;
                }, 3000);
            }
        });

        // Stop typing indicator
        if (isTyping) {
            isTyping = false;
            socket.emit('typing', { workCallId: workCall.id, isTyping: false });
        }
    };
    // Handle typing indicators
    const handleTyping = () => {
        if (!socket || !workCall) return;
        
        if (!isTyping) {
            isTyping = true;
            socket.emit('typing', { workCallId: workCall.id, isTyping: true });
            
            // Stop typing indicator after 3 seconds of inactivity
            setTimeout(() => {
                if (isTyping) {
                    isTyping = false;
                    socket.emit('typing', { workCallId: workCall.id, isTyping: false });
                }
            }, 3000);
        }
    };

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
    };

    // Handle Enter key press
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    // Format message timestamp
    const formatTime = (timestamp: string) => {
        try {
            return new Date(timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } catch {
            return '';
        }
    };

    // Request actions (unchanged)
    const handleAccept = async () => {
        isSubmitting = true;
        try {
            if (workCall) {
                await freelanceAxios.patch(`/work-call/${workCall.id}/accept`);
                workCall.status = 'accepted';
                // Notify via socket
                socket?.emit('workCallStatusUpdate', { 
                    workCallId: workCall.id, 
                    status: 'accepted' 
                });
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to accept request';
        } finally {
            isSubmitting = false;
        }
    };

    const handleReject = async () => {
        isSubmitting = true;
        try {
            if (workCall) {
                await freelanceAxios.patch(`/work-call/${workCall.id}/reject`);
                workCall.status = 'rejected';
                // Notify via socket
                socket?.emit('workCallStatusUpdate', { 
                    workCallId: workCall.id, 
                    status: 'rejected' 
                });
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to reject request';
        } finally {
            isSubmitting = false;
        }
    };
</script>

<!-- IMPROVED MESSAGE DISPLAY SECTION -->
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
        <!-- Header Section with Connection Status -->
        <div class={`bg-gradient-to-r ${colorClasses.gradientFrom} ${colorClasses.gradientTo} p-6 text-white`}>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <img 
                            class="w-16 h-16 rounded-full border-4 border-white/30 object-cover" 
                            src={workCall.consumerAvatar} 
                            alt={workCall.fromName}
                        />
                        <div class={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold">{user.name}</h1>
                        <div class="flex items-center space-x-2">
                            <span class="text-opacity-80">📞 {user.phone}</span>
                            {#if user?.email}
                                <span class="text-opacity-80">✉️ {user?.email}</span>
                            {/if}
                        </div>
                        <div class="text-sm text-opacity-80">
                            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-opacity-80">Status</div>
                    <div class="text-lg font-semibold capitalize">{workCall.status}</div>
                </div>
            </div>
        </div>

        <!-- Service Request Details (unchanged) -->
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
                            <div class="text-gray-600">{workCall.date}</div>
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

        <!-- IMPROVED MESSAGE HISTORY SECTION -->
        <div class={`p-6 border-b ${colorClasses.border}`}>
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                Message History
                {#if !isConnected}
                    <span class="text-sm text-red-500 font-normal">(Disconnected)</span>
                {/if}
            </h2>
            
            <!-- Messages Container -->
            <div 
                bind:this={messagesContainer}
                class="space-y-4 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg"
            >
                {#if workCall.messages.length === 0}
                    <div class="text-center text-gray-500 py-8">
                        No messages yet. Start the conversation!
                    </div>
                {:else}
                    {#each workCall.messages as message (message.id)}
                        <div class={`flex ${message.senderId === userDetail.id ? 'justify-end' : 'justify-start'}`}>
                            <div class={`max-w-xs md:max-w-md rounded-lg p-3 shadow-sm ${
                                message.senderId === userDetail.id 
                                    ? colorClasses.bg + ' text-gray-800' 
                                    : 'bg-white text-gray-800 border border-gray-200'
                            }`}>
                                <p class="whitespace-pre-wrap">{message.content}</p>
                                <div class="text-xs text-gray-500 mt-1 text-right">
                                    {formatTime(message.createdAt)}
                                    {#if message.senderId === userDetail.id}
                                        <span class="ml-1">✓</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                {/if}
                
                <!-- Typing Indicator -->
                {#if otherUserTyping}
                    <div class="flex justify-start">
                        <div class="bg-gray-200 rounded-lg p-3 max-w-xs">
                            <div class="flex space-x-1">
                                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            
            <!-- IMPROVED MESSAGE INPUT -->
            <div class="mt-6">
                <div class="flex items-end space-x-2">
                    <div class="flex-1">
                        <textarea
                            bind:value={inputMessage}
                            on:input={handleTyping}
                            on:keydown={handleKeyDown}
                            placeholder="Type your message... (Press Enter to send)"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            rows="2"
                            disabled={!isConnected || isSubmitting}
                        ></textarea>
                        {#if isTyping}
                            <div class="text-xs text-gray-500 mt-1">Typing...</div>
                        {/if}
                    </div>
                    <button
                        on:click={sendMessage}
                        disabled={!inputMessage.trim() || !isConnected || isSubmitting}
                        class={`px-6 py-2 rounded-lg text-white transition-all duration-200 ${
                            (!inputMessage.trim() || !isConnected || isSubmitting)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : type === 'requestedByMe' 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                        {isSubmitting ? '...' : 'Send'}
                    </button>
                </div>
                
                {#if !isConnected}
                    <div class="text-sm text-red-500 mt-2">
                        ⚠️ Connection lost. Trying to reconnect...
                    </div>
                {/if}
            </div>
        </div>

        <!-- Action Buttons (unchanged) -->
        {#if workCall.status === 'pending'}
            <div class="p-6 flex justify-end space-x-4">
                <button
                    on:click={handleReject}
                    disabled={isSubmitting}
                    class={`px-6 py-2 border ${type === 'requestedByMe' ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-600 text-red-600 hover:bg-red-50'} rounded-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Processing...' : 'Reject'}
                </button>
                <button
                    on:click={handleAccept}
                    disabled={isSubmitting}
                    class={`px-6 py-2 ${type === 'requestedByMe' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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

