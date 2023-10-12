import { io } from "socket.io-client";

const initProps = {
    id: null,
    socket: null,
    isConnected: false,
    chats: [],
    currentChat: 101,
    messages: [],
    typing: null,
    onlineUsers: [],
    notification: [],
    uiState: {
        isChatOpen: false,
        active: "chats",
    },
    isLoading: false,
    error: null,
    deviceState: {
        soundEnabled: true,
        theme: "light",
    },
};

const globalStore = (set, get) => ({
    ...initProps,
    initSocket: (token) => {
        const socket = get().socket;

        if (!socket) {
            const ws = io("/", {
                auth: { token: `Bearer ${token}` },
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
                    const updatedList = state.onlineUsers.filter((obj) => {
                        return obj.id !== userId;
                    });
                    return { onlineUsers: updatedList };
                });
            });

            ws.on("connect_error", (error) => {
                console.warn("Connection error:", error.message);
            });

            ws.on("message:receive", (message) => {
                const currentChat = get().currentChat;
                const soundEnabled = get().deviceState.soundEnabled;

                set((state) => {
                    if (message.chatId === currentChat) {
                        state.messages.push(message);

                        if (soundEnabled) {
                            const audio = document.getElementById("audio");
                            audio.currentTime = 0;
                            audio.play();
                        }
                    } else {
                        state.notification.push(message);
                    }
                });
            });
        }
    },
    setUser: (userId) => {
        set({ id: userId });
    },
    sendMessage: (content) => {
        set((state) => {
            const ws = get().socket;
            ws?.emit("message:send", content);
            state.messages.push(content);
        });
    },
    disconnect: () => {
        const ws = get().socket;
        ws?.disconnect();
    },
    createChat: (data) => {
        const ws = get().socket;

        const payload = {
            name: data.name,
            group: data.group,
            participants: data.participants,
        };

        const response = (chatObj) => {
            set((state) => {
                state.chats.push(chatObj);
                state.currentChat = chatObj.id;
            });
        };

        ws?.emit("chat:create", payload, response);
    },
    updateUi: (ui = "view:chat", openChat = true) => {
        set({ uiState: { isChatOpen: openChat, active: ui } });
    },
    setSoundEnabled: (bool)=> {
        set((state)=>{
            state.deviceState.soundEnabled = bool;
        })
    },
    setTheme: (newTheme) => {
        set((state)=>{
            state.deviceState.theme = newTheme
        })
    }
});

export default globalStore;
