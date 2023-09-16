export const authMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (token) {
        console.log("Token here")
        next();
    } else {
        console.log("No token here")
        next(new Error("unauthorized"));
    }
};

export const errorHandler = () => {};
