import { io } from "socket.io-client";

const initProps = {
    socket: null,
    user: {
        id: null,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        picture: "",
        online: null,
        bio: "",
        status: "",
        appMeta: {},
        createdAt: "",
        updatedAt: "",
    },
    isConnected: false,
    chats: [],
    currentChat: null,
    messages: [],
    typing: null,
    onlineUsers: [],
    notification: [],
    uiState: {
        isChatOpen: false,
        active: "chats",
    },
    deviceState: {
        soundEnabled: true,
        theme: "light",
    },
    isLoading: false,
    error: null,
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

            ws.on("user:profile", (user)=> {
                set({user})
            })

            ws.on("user:connect", (user) => {
                set((state) => {
                    state.onlineUsers.push(user);
                });
            });

            ws.on("user:disconnect", (userId) => {
                set((state) => {
                    const newUserList = state.onlineUsers.filter((obj) => {
                        return obj.id !== userId;
                    });
                    return { onlineUsers: newUserList };
                });
            });

            ws.on("connect_error", (error) => {
                console.warn("Connection error:", error.message);
            });

            ws.on("chat:created", (payload)=>{
                set((state) => {
                    state.chats.push(payload);
                });

                //Join chatroom
                ws.emit("chat:join", payload.id);
            })

            ws.on("message:receive", (message) => {
                const currentChat = get().currentChat;
                const soundEnabled = get().deviceState.soundEnabled;
                const id = get().user.id;

                set((state) => {
                    if (message.chatId === currentChat) {
                        state.messages.push(message);

                        if (soundEnabled && message.senderId !== id) {
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
    createNewChat: (payload) => {
        const ws = get().socket;
        ws?.emit("chat:create", payload);
        
        set((state) => {
            state.chats.push(payload);
        });
    },
    updateUi: (ui = "view:chat", openChat = true) => {
        set({ uiState: { isChatOpen: openChat, active: ui } });
    },
    setSoundEnabled: (boolVal)=> {
        set((state)=>{
            state.deviceState.soundEnabled = boolVal;
        })
    },
    setTheme: (newTheme) => {
        set((state)=>{
            state.deviceState.theme = newTheme
        })
    },
    setChats: (chats) => {
        set((state)=>{
            state.chats = chats
        })
    },
    setCurrentChat: (chatId) => {
        set({currentChat: chatId})
    },
    setUser: (user)=> {
        set({user})
    }
});

export default globalStore;
