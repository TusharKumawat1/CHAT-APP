import { io } from 'socket.io-client';

// Create and export a socket instance
const socket = io('https://chatapp-afbn.onrender.com'); // Replace with your server's URL

export default socket;