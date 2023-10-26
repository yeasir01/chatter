import { Socket } from "socket.io";
import UserStore from "../utils/UserStore.js";
import repo from "../repository/index.js";

//@todo Upgrade to redis
//memory store
const store = new UserStore();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const socketHandler = async (socket) => {
    let authId = socket.auth.payload.sub;
    
    //Send user profile after handshake
    socket.emit("user:profile", socket.user)

    //Add user to mem-storage
    store.addDevice(authId, socket.id);

    //Join chat rooms user participates in
    const chatRooms = await repo.chat.getChatIdsByUserId(authId);
    socket.join(chatRooms);

    //Broadcast to all joined rooms that user is now connected.
    socket.broadcast.to([...socket.rooms]).emit("user:connect", socket.user);

    socket.on("chat:create", async (payload, callback) => {
        const chat = await repo.chat.createNewChat({
            name: payload.name,
            group: payload.group,
            adminId: authId,
            participants: payload.participants
        });

        callback(chat)
    });

    socket.on("message:send", (content) => {
        socket.broadcast.to([...socket.rooms]).emit("message:receive", content);
    });

    socket.on("disconnect", () => {
        store.deleteDevice(authId, socket.id)
        socket.broadcast.to([...socket.rooms]).emit("user:disconnect", authId);
        console.log("Online Users (disconnect): ", store.users);
    });

    console.log("Online Users (connect): ", store.users);
};

export default socketHandler;