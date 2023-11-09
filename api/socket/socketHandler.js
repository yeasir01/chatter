import { Socket, Server } from "socket.io";
import UserStore from "../utils/UserStore.js";
import repo from "../repository/index.js";

//@todo Upgrade to redis
//connected users - memory store
const store = new UserStore();

/**
 * Socket handler function.
 * @param {Socket} socket - This is the main object for interacting with a client.
 * @param {Server} io - Represents a Socket.IO server.
 */
const socketHandler = async (socket, io) => {
    let userId = socket.user.id;
    
    //Send user profile after handshake
    socket.emit("user:profile", socket.user)

    //Add user to mem-store
    store.addDevice(userId, socket.id);

    //Join chat rooms user participates in
    const chatRooms = await repo.chat.getChatIdsByUserId(userId);
    socket.join(chatRooms);

    //Broadcast to all joined rooms that user is now connected.
    socket.broadcast.to([...socket.rooms]).emit("user:connect", userId);

    socket.on("chat:create", (payload) => {
        socket.join(payload.id);
        
        payload.participants.forEach((participant)=>{
            const devices = store.getDevices(participant.id);
            
            if (devices){
                devices.forEach((socketId)=>{
                    socket.broadcast.to(socketId).emit("chat:created", payload)
                    //io.sockets.sockets.get(socketId).join(payload.id) //may not need this??
                })
            }
        })
    });

    socket.on("user:profile-update", (data)=> {
        console.log(data)
        socket.broadcast.to([...socket.rooms]).emit("user:profile-updated", data);
    })

    socket.on("chat:join", (chatId)=>{
        socket.join(chatId)
    })

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