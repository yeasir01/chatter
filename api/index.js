import env from "./config/env.js";
import express from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

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

//Express & Socket Server Config
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = env.SERVER_PORT;

//Register Express Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/v1/health", healthRoutes);
app.use(auth)
app.use(deserializeUser);

//Register Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

//Register Error Handler
app.use(errorHandler);

//Register Socket Middlewares
io.engine.use(helmet());
io.use(wrap(auth));
io.use(wrap(deserializeUser));

//Setup listeners
io.on("connection", handleSocketRequests);

httpServer.listen(PORT, () =>
    console.info(`API Server listening on port ${PORT}`)
);
