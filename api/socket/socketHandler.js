import { Socket } from "socket.io";

let users = [];

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

    //Add user to the users array
    users.push(user);
    
    //print all connected users
    console.log("Current Users: ", users);

    //Setup listeners
    socket.on("disconnect", (err) => {
        console.log("Disconnect Error:", err);
        users = users.filter(user=> user.socket != socket.id)
        console.log("Current Users: ", users)
    });
};

export default handleSocketRequest;
