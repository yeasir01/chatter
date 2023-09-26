import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState({});
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let newSocket;

        (async () => {
            try {
                const token = await getAccessTokenSilently();
                newSocket = io("/", {
                    auth: { token: `Bearer ${token}` },
                });
                setSocket(newSocket);
            } catch (error) {
                console.log("Error thrown in SocketContext: ", error);
            }
        })();

        // Clean up the socket connection when the context is unmounted
        return () => {
            newSocket.disconnect();
        };
    }, [getAccessTokenSilently]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const socket = useContext(SocketContext);
    if (socket === null) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
};

export { SocketProvider, useSocket };
