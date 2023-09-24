import env from "../config/env.js";

//Socket.io middleware
const decodeToken = async (socket, next) => {
    try {
        const bearerToken = socket.handshake.auth.token;

        if (!bearerToken) {
            throw Error("Token is missing.");
        }

        const options = {
            method: "GET",
            headers: {
                Authorization: bearerToken,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(`${env.AUTH0_DOMAIN}/userinfo`, options);
        const data = await response.json();

        socket.user = {
            id: data.sub,
            email: data.email,
            picture: data.picture,
        };

        next();
    } catch (err) {
        console.error(err.message);
        next(Error("Unauthorized"));
    }
};

export default decodeToken;
