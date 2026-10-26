import { SocketContext } from 'context/socket/socket-context';
import { useContext } from 'react';

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within an AuthProvider');
    }
    return context;
};
