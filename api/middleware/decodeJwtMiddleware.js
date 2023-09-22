//Socket.io middleware
const decodeToken = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            throw Error("Token is missing.");
        }

        const options = { headers: { Authorization: token } };
        const response = await fetch(
            "https://yeasirhugais.us.auth0.com/userinfo",
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
