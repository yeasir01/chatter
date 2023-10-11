import { Socket } from "socket.io";
import UserStore from "../utils/UserStore.js";
import repo from "../repository/index.js";

const store = new UserStore();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const socketHandler = async (socket) => {
    let userId = socket.auth.payload.sub;
    let activeRoom = null;

    store.addDevice(userId, socket.id);

    const chatRooms = await repo.chat.getChatIdsByUserId(userId);
    socket.join(chatRooms);

    socket.broadcast.to([...socket.rooms]).emit("user:connect", socket.user);

    socket.on("chat:create", async (payload, callback) => {
        const chat = await repo.chat.createNewChat({
            name: payload.name,
            group: payload.group,
            admin: userId,
            participants: payload.participants
        });

        callback(chat)
        console.log("new chat created!")
    });

    socket.on("message:send", (content) => {
        socket.broadcast.to([...socket.rooms]).emit("message:receive", content);
    });

    socket.on("disconnect", () => {
        store.deleteDevice(userId, socket.id)
        socket.broadcast.to([...socket.rooms]).emit("user:disconnect", userId);
        console.log("Online Users (disconnect): ", store.users);
    });

    console.log("Online Users (connect): ", store.users);
};

export default socketHandler;