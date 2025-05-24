// src/lib/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000/api/socket'); // Replace with your server URL

export default socket;
