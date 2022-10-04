import { io } from 'socket.io-client';

const socketInit = () => {
    return io('http://localhost:5000')
};

export default socketInit;