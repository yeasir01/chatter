import { Socket } from "socket.io";
import repo from "../repository/index.mjs";
import store from "../utils/userStore.mjs";

/**
 * Socket handler function.
 * @param {Socket} socket - This is the main object for interacting with a client.
 */
const socketHandler = (socket) => {
    let userId = socket.user.id;

    //Add user to mem-store
    store.addDevice(userId, socket.id);

    //Join all chat rooms user participates in
    repo.chat.getChatIdsByUserId(userId)
        .then((rooms) => {
            // Join all rooms
            socket.join(rooms);

            //Broadcast to all joined rooms that user is now connected.
            socket.to(rooms).emit("user:connect", userId);
        })
        .catch(() => {
            console.log("Failed to get room ids from db.");
        });

    //Broadcast to all participants a new chat has been created.
    socket.on("chat:create", (chat) => {
        socket.join(chat.id);

        chat.participants.forEach((participant) => {
            const devices = store.getDevices(participant.id);

            if (devices) {
                devices.forEach((socketId) => {
                    socket.to(socketId).emit("chat:created", chat);
                });
            }
        });
    });

    socket.on("user:profile-update", (data) => {
        socket.to([...socket.rooms]).emit("user:profile-updated", data);
    });

    socket.on("user:start-typing", (chatId) => {
        socket.to(chatId).emit("user:typing", { userId, chatId });
    });

    socket.on("user:stop-typing", (chatId) => {
        socket.to(chatId).emit("user:stopped-typing", { userId, chatId });
    });

    socket.on("chat:join", (chatId) => {
        socket.join(chatId);
    });

    socket.on("message:send", (message) => {
        const chatRoom = message.chatId;
        socket.to(chatRoom).emit("message:receive", message);
    });

    socket.on("disconnect", () => {
        const onlineDevices = store.deleteDevice(userId, socket.id);
        
        if(!onlineDevices){
            socket.to([...socket.rooms]).emit("user:disconnect", userId);
        }
        
        console.log("USERS (user disconnected): ", store.users);
    });

    console.log("USERS (new connection): ", store.users);
};

export default socketHandler;