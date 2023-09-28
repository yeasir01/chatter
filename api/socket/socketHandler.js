import { Socket, Server } from "socket.io";

const onlineUsers = new Map();

/**
 * Socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 * @param {Server} io - The Socket.IO server instance.
 */
const handleSocketRequest = (socket, io) => {
    let userId = socket.user.id;

    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, { devices: new Set() });
        io.to([...socket.rooms]).emit("user:connect", socket.user)
    }

    onlineUsers.get(userId).devices.add(socket.id);

    socket.on("disconnect", () => {
        const user = onlineUsers.get(userId);

        if (user) {
            user.devices.delete(socket.id);
        }

        if (user.devices.size === 0) {
            onlineUsers.delete(userId);
            io.to([...socket.rooms]).emit("user:disconnect", userId)
        }

        console.log("Online Users (disconnect): ", onlineUsers);
    });

    socket.on("chat:join", (chatId)=>{
        //Build out this functionality
    })

    socket.on("message:send", (content)=> {
        console.log("FromClient: ", content)
        socket.broadcast.to(333).emit("message:receive", "hello")
    })

    console.log("Online Users (connect): ", onlineUsers);
};

export default handleSocketRequest;
