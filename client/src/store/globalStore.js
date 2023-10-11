import { io } from "socket.io-client";

const mockMessages = [
    {
        id: "1",
        chatId: "101",
        content: "Hello from user 1!",
        attachment: "",
        fileName: "",
        fileSize: "",
        senderId: "user1",
        createdAt: "1696964754784",
    },
    {
        id: "2",
        chatId: "101",
        content: "Here from user 2!",
        attachment: "",
        fileName: "",
        fileSize: "",
        senderId: "user2",
        createdAt: "1696964803823",
    },
    {
        id: "3",
        chatId: "101",
        content: `Back in 2013 I created this CodePen of the chat bubble UI from iOS 
        7's messages app. It has since received an impressive 50k views and 
        170+ likes, apparently people like to build chat apps 😉. In this 
        post I'll walk you through how it works, while also improving my 
        previous code a bit`,
        attachment: "",
        fileName: "",
        fileSize: "",
        senderId: "user1",
        createdAt: "1696964842208",
    },
];

const initProps = {
    id: null,
    socket: null,
    isConnected: false,
    chats: [],
    currentChat: 101,
    messages: [...mockMessages],
    typing: null,
    onlineUsers: [],
    notification: [],
    uiState: {
        isChatOpen: false,
        active: "chats",
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
                    return { onlineUsers: x };
                });
            });

            ws.on("connect_error", (error) => {
                console.warn("Connection error:", error.message);
            });

            ws.on("message:receive", (message) => {
                const currentChat = get().currentChat;

                set((state) => {
                    if (message.chatId === currentChat) {
                        state.messages.push(message);
                    } else {
                        state.notification.push(message);
                    }
                });
            });
        }
    },
    setUser: (userId) => {
        set({id: userId})
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
            });
        };

        ws?.emit("chat:create", payload, response);
    },
    updateUi: (ui = "view:chat", isChatOpen = true) => {
        set((state) => {
            return {
                uiState: {
                    isChatOpen: isChatOpen,
                    active: ui,
                },
            };
        });
    },
});

export default globalStore;
