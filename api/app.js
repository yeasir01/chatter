import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import { decodeJWT } from "./middleware/handShakeMiddleware.js";

//Routes import
import testRoutes from "./routes/v1/test/testRoutes.js";

//Express & Socket Server Config
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 5000;

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
io.use(decodeJWT);

io.on("connection", (socket) => {
    console.log(`Socket Connected ${socket.id}`);
});

httpServer.listen(PORT, () =>
    console.log(`API Server listening on port ${PORT}`)
);
