import { Socket } from "socket.io";
import UserStore from "../utils/UserStore.js";
import repo from "../repository/index.js";

//@todo Upgrade to redis
//connected users - memory store
const store = new UserStore();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const socketHandler = async (socket) => {
    let authId = socket.auth.payload.sub;
    let userId = socket.user.id;
    
    //Send user profile after handshake
    socket.emit("user:profile", socket.user)

    //Add user to mem-store
    store.addDevice(userId, socket.id);

    //Join chat rooms user participates in
    const chatRooms = await repo.chat.getChatIdsByUserId(userId);
    socket.join(chatRooms);

    //Broadcast to all joined rooms that user is now connected.
    socket.broadcast.to([...socket.rooms]).emit("user:connect", socket.user);

    socket.on("chat:create", (payload) => {
        payload.participants.forEach((participant)=>{
            const devices = store.getDevices(participant.id);
            
            if(devices){
                socket.broadcast.to([...devices]).emit("chat:created", payload)
            }
        })
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