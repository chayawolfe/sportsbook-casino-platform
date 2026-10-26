import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type SocketContextValue = {
    socket: Socket | null;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export { SocketContext };
