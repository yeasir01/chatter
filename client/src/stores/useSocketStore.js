import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";

const IS_DEV = process.env.NODE_ENV === "development";

// immer middleware handles state immutability for us.
// devtools middleware allows us to use redux dev toolkit.
const useSocketStore = create(
    devtools(
        immer((set, get) => ({
            socket: null,
            isConnected: false,
            initSocket: (token) => {
                const existingSocket = get().socket;

                if (!existingSocket) {
                    const ws = io("/", {
                        auth: { token: `Bearer ${token}` },
                    });

                    ws.on("connect", () => {
                        set({ socket: ws, isConnected: true });
                    });

                    ws.on("disconnect", () => {
                        set({ socket: null, isConnected: false });
                    });
                }
            },
            sendMessage: (content) => {
                const ws = get().socket;
                ws?.emit("message:create", content);
            },
            disconnect: () => {
                const ws = get().socket;
                ws?.disconnect();
            },
        })),
        { enabled: IS_DEV }
    )
);

export default useSocketStore;
