import { Socket } from "socket.io";
import { user, chats } from "../repository/index.js";

const onlineUsers = new Map();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const socketHandler = async (socket) => {
    let userId = socket.auth.payload.sub;
    let activeRoom = null;

    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, { devices: new Set() });
    }

    onlineUsers.get(userId).devices.add(socket.id);

    const chatRooms = await chats.getChatIdsByUserId(userId);
    socket.join(chatRooms);

    socket.broadcast.to([...socket.rooms]).emit("user:connect", socket.user);

    socket.on("chat:join", (chatId) => {
        //Build out this functionality
    });

    socket.on("chat:active", (chatId) => {
        activeRoom = chatId;
    });

    socket.on("message:send", async (content) => {
        socket.broadcast.to([...socket.rooms]).emit("message:receive", content);
    });

    socket.on("disconnect", () => {
        const user = onlineUsers.get(userId);

        if (user) {
            user.devices.delete(socket.id);
        }

        if (user.devices.size === 0) {
            onlineUsers.delete(userId);
            socket.broadcast.to([...socket.rooms]).emit("user:disconnect", userId);
        }

        console.log("Online Users (disconnect): ", onlineUsers);
    });

    console.log("Online Users (connect): ", onlineUsers);
};

export default socketHandler;
