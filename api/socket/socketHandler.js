import { Socket } from "socket.io";

const onlineUsers = new Map();

/**
 * Custom socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const handleSocketRequest = (socket) => {
    
    onlineUsers.set(socket.id, socket.user.email)
    console.log("Online Users: ", onlineUsers);

    socket.on("disconnect", () => {
        onlineUsers.delete(socket.id)
        console.log("Online Users: ", onlineUsers)
    });
};

export default handleSocketRequest;
