import { io } from 'socket.io-client';

// Create and export a socket instance
const socket = io('http://localhost:3001'); // Replace with your server's URL

export default socket;