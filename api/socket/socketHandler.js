import { Socket } from "socket.io";
import { store } from "../utils/userStore.js";
import repo from "../repository/index.js";

/**
 * Socket handler function.
 * @param {Socket} socket - This is the main object for interacting with a client.
 */
const socketHandler = async (socket) => {
    let userId = socket.user.id;
    
    //Send user profile after handshake
    socket.emit("user:get-profile", socket.user)

    //Add user to mem-store
    store.addDevice(userId, socket.id);

    //Join chat rooms user participates in
    const chatRooms = await repo.chat.getChatIdsByUserId(userId);
    socket.join(chatRooms);

    //Broadcast to all joined rooms that user is now connected.
    socket.to([...socket.rooms]).emit("user:connect", userId);

    //Broadcast to all participants a new chat has been created.
    socket.on("chat:create", (chat) => {
        socket.join(chat.id);
        
        chat.participants.forEach((participant)=>{
            const devices = store.getDevices(participant.id);
            
            if (devices){
                devices.forEach((socketId)=>{
                    socket.to(socketId).emit("chat:created", chat)
                })
            }
        })
    });

    socket.on("user:profile-update", (data)=> {
        socket.to([...socket.rooms]).emit("user:profile-updated", data);
    })
    
    socket.on("user:start-typing", (chatId)=> {
        socket.to(chatId).emit("user:typing", {userId, chatId});
    })

    socket.on("user:stop-typing", (chatId)=> {
        socket.to(chatId).emit("user:stopped-typing", {userId, chatId});
    })

    socket.on("chat:join", (chatId)=>{
        socket.join(chatId)
    })

    socket.on("message:send", (message) => {
        const chatRoom = message.chatId;
        socket.to(chatRoom).emit("message:receive", message);
    });

    socket.on("disconnect", () => {
        store.deleteDevice(userId, socket.id)
        socket.to([...socket.rooms]).emit("user:disconnect", userId);
        //console.log("Online Users (disconnect): ", store.users);
    });

    //console.log("Online Users (connect): ", store.users);
};

export default socketHandler;