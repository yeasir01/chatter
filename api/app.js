import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

import testRoutes from "./routes/v1/test/testRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import { authMiddleware } from "./socket/socketMiddleware.js";

//Express & Socket Server Config
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 5000;

//Express Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Socket Middleware
io.use(authMiddleware);

io.on("connection", (socket) => {
    console.log(`Socket Connected ${socket.id}`);
});

//Register Express Routes
app.use("/api/v1/test", testRoutes);

//Express Error Handler
app.use(errorHandler);

httpServer.listen(PORT, () =>
    console.log(`API Server listening on port ${PORT}`)
);
