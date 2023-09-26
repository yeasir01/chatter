import { Socket } from "socket.io";

const onlineUsers = new Map();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const handleSocketRequest = (socket) => {
    //on connection
    if (!onlineUsers.has(socket.user.id)) {
        onlineUsers.set(socket.user.id, { devices: new Set() });
    }

    onlineUsers.get(socket.user.id).devices.add(socket.id);

    console.log("Online Users: ", onlineUsers);

    socket.on("disconnect", () => {
        const user = onlineUsers.get(socket.user.id);

        if (user) {
            user.devices.delete(socket.id);
        }

        if (user.devices.size === 0) {
            onlineUsers.delete(socket.user.id);
        }

        console.log("Online Users: ", onlineUsers);
    });
};

export default handleSocketRequest;
