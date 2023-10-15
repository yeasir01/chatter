import env from "./config/env.js";
import express from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

import errorHandler from "./middleware/errorHandlerMiddleware.js";
import socketHandlers from "./socket/socketHandlers.js";
import auth from "./middleware/authMiddleware.js";
import wrap from "./utils/middlewareWrap.js";
import deserializeUser from "./middleware/deserializeUserMiddleware.js";

//Import routes
import healthRoutes from "./routes/v1/health/healthRoutes.js";
import userRoutes from "./routes/v1/user/userRoutes.js";

//Express & Socket Server Config
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = env.SERVER_PORT;

//Register Express Middlewares & Routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/v1/health", healthRoutes);

app.use(auth)
app.use(deserializeUser);
app.use("/api/v1/user", userRoutes);

//Register Error Handler
app.use(errorHandler);

//Register Socket Middlewares
io.engine.use(helmet());
io.use(wrap(auth));
io.use(wrap(deserializeUser));

//Setup listeners
io.on("connection", socketHandlers);

httpServer.listen(PORT, () =>
    console.info(`API Server listening on port ${PORT}`)
);
