import env from "../config/env.js";

//Socket.io middleware
const decodeToken = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            throw Error("Token is missing.");
        }

        const options = { headers: { Authorization: token } };
        const response = await fetch(
            env.AUTH0_DOMAIN + "/userinfo",
            options
        );
        const data = await response.json();

        socket.user = {
            email: data.email,
        };

        next();
    } catch (err) {
        console.error(err);
        next(Error("Unauthorized"));
    }
};

export default decodeToken;
