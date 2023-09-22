import { Socket } from "socket.io";

const users = [];

/**
 * Custom socket handler function.
 * @param {Socket} socket - The Socket.IO socket instance.
 */
const handleSocketRequest = (socket) => {
    //Create a new user on connection
    const user = {
        email: socket.user.email,
        socket: socket.id,
    };

    //Add user to users array
    users.push(user);
    
    //print all users connected
    console.log("Current Users: ", users);

    //Setup listeners
    socket.on("disconnect", (err) => {
        console.log("Error Connect:", err);
    });
};

export default handleSocketRequest;
