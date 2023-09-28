import env from "./config/env.js";
import express from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

import { errorHandler } from "./middleware/errorMiddleware.js";
import handleSocketRequest from "./socket/socketHandler.js";
import decodeJwt from "./middleware/decodeJwtMiddleware.js";

//Routes import
import testRoutes from "./routes/v1/test/testRoutes.js";

//Express & Socket Server Config
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = env.SERVER_PORT;

//Register Express Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Register Express Routes
app.use("/api/v1/test", testRoutes);

//Register Error Handler
app.use(errorHandler);

//Socket Middleware
io.engine.use(helmet());
io.use(decodeJwt);

//Setup listeners
io.on("connection", (socket) => {
    handleSocketRequest(socket, io);
});

httpServer.listen(PORT, () =>
    console.info(`API Server listening on port ${PORT}`)
);
