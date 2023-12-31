//Import packages
import express from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

//Import env variables
import env from "./config/env.js";

//Import middleware
import errorHandler from "./middleware/errorHandlerMiddleware.js";
import handleSocketRequests from "./socket/socketHandler.js";
import auth from "./middleware/authMiddleware.js";
import wrap from "./utils/middlewareWrap.js";
import deserializeUser from "./middleware/deserializeUserMiddleware.js";

//Import routes
import healthRoutes from "./routes/v1/health/healthRoutes.js";
import userRoutes from "./routes/v1/user/userRoutes.js";
import chatRoutes from "./routes/v1/chat/chatRoutes.js";
import messageRoutes from "./routes/v1/message/messageRoutes.js";

//Configure socket & http server
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//Register Express Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

//Health check route
app.use("/api/health", healthRoutes);

//Auth Middleware
app.use(auth);
app.use(deserializeUser);

//Register Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

//Register error handler
app.use(errorHandler);

// Middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
        message: "Resource not found.",
    });
});

//Register socket middleware
io.engine.use(helmet());
io.use(wrap(auth));

//If the user data is needed in the socket object, enable this middleware.
io.use(wrap(deserializeUser));

//Setup listeners
io.on("connection", handleSocketRequests);

httpServer.listen(env.SERVER_PORT, () =>
    console.info(`API Server listening on port ${env.SERVER_PORT}`)
);
