import { io } from "socket.io-client";

const initProps = {
    socket: null,
    isConnected: false,
    chats: [],
    currentChat: null,
    messages: [],
    typing: null,
    onlineUsers: [],
    notification: [],
    uiState: {
        isChatOpen: false,
        activeTab: "chats",
    },
    isLoading: false,
    error: null,
};

const globalStore = (set, get) => ({
    ...initProps,
    initSocket: (token) => {
        const existingSocket = get().socket;

        if (!existingSocket) {
            const ws = io("/", {
                auth: { token: `Bearer ${token}`}
            });

            ws.on("connect", () => {
                set({ socket: ws, isConnected: true });
            });

            ws.on("disconnect", () => {
                set({ socket: null, isConnected: false });
            });

            ws.on("user:connect", (user) => {
                set((state) => {
                    state.onlineUsers.push(user);
                });
            });

            ws.on("user:disconnect", (userId) => {
                set((state) => {
                    const x = state.onlineUsers.filter((obj) => {
                        return obj.id !== userId;
                    });
                    return {onlineUsers: x};
                });
            });

            ws.on("connect_error", (error) => {
                console.error("Connection error:", error.message);
            });

            ws.on("message:receive", (message) => {
                set((state) => {
                    state.messages.push(message);
                });
            });
        }
    },
    sendMessage: (content) => {
        const ws = get().socket;
        ws?.emit("message:send", content);
    },
    disconnect: () => {
        const ws = get().socket;
        ws?.disconnect();
    },
    joinChat: (id)=> {
        const ws = get().socket;
        ws?.emit("chat:join", id);
    }
});

export default globalStore;