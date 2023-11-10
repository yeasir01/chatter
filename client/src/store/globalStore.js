import { io } from "socket.io-client";

const USER_DEFAULTS = Object.freeze({
    id: null,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    picture: "",
    online: null,
    bio: "",
    status: "",
    createdAt: "",
    updatedAt: "",
});

const initProps = {
    socket: null,
    userId: null,
    isConnected: false,
    chats: [],
    messages: [],
    profiles: {},
    notification: {},
    currentChat: null,
    typing: null,
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

            ws.on("user:profile", (user) => {
                set((state) => {
                    state.profiles[user.id] = user;
                    state.userId = user.id;
                });
            });

            ws.on("user:profile-updated", (user) => {
                set((state) => {
                    state.profiles[user.id] = user;
                });
            });

            ws.on("user:connect", (userId) => {
                set((state) => {
                    //state.profiles[userId].online = true;
                });
            });

            ws.on("user:disconnect", (userId) => {
                set((state) => {
                    //state.profiles[userId].online = false;
                });
            });

            ws.on("connect_error", (error) => {
                console.warn("WS connect error: ", error.message);
            });

            ws.on("chat:created", (payload) => {
                set((state) => {
                    state.chats.push(payload);
                });

                //Join chatroom
                ws.emit("chat:join", payload.id);
            });

            ws.on("message:receive", (message) => {
                const currentChat = get().currentChat;
                const soundEnabled = get().deviceState.soundEnabled;
                const id = get().userId;

                set((state) => {
                    if (message.chatId === currentChat) {
                        state.messages.push(message);
                        state.chats.find((chat) => chat.id === message.chatId).lastMessage = message;

                    } else {
                        state.notification[message.chatId] = (state.notification[message.chatId] || 0) + 1;
                        state.chats.find((chat) => chat.id === message.chatId).lastMessage = message;
                    }
                    
                    if (soundEnabled && message.senderId !== id) {
                        const audio = document.getElementById("audio");
                        audio.currentTime = 0;
                        audio.play();
                    }
                });
            });
        }
    },
    sendMessage: (message) => {
        const ws = get().socket;

        set((state) => {
            ws.emit("message:send", message);
            state.messages.push(message);
            state.chats.find((chat) => chat.id === message.chatId).lastMessage =
                message;
        });
    },
    disconnect: () => {
        const ws = get().socket;
        ws?.disconnect();
    },
    createNewChat: (payload) => {
        //get reference to w/s.
        const ws = get().socket;

        //Send payload received from fetch call to online participants through w/s.
        ws.emit("chat:create", payload);

        //Pull participants objects and store separate from chat.
        const { participants, ...rest } = payload;

        //Leave id's with chat for referencing chat participants later on.
        const partIds = payload.participants.map((person) => {
            return person.id;
        });

        const chat = {
            ...rest,
            participants: partIds,
        };

        set((state) => {
            state.chats.push(chat);

            participants.forEach((person) => {
                state.profiles[person.id] = person;
            });

            state.currentChat = payload.id;
        });
    },
    updateUi: (ui = "view:chat", openChat = true) => {
        set({ uiState: { isChatOpen: openChat, active: ui } });
    },
    setSoundEnabled: (bool) => {
        set((state) => {
            state.deviceState.soundEnabled = bool;
        });
    },
    setTheme: (newTheme) => {
        set((state) => {
            state.deviceState.theme = newTheme;
        });
    },
    setChats: (chats) => {
        const allChats = [];
        const allMembers = {};

        chats.forEach(({ participants, ...rest }) => {
            const participantsIds = [];

            for (const person of participants) {
                allMembers[person.id] = person;
                participantsIds.push(person.id);
            }

            const chat = {
                ...rest,
                participants: participantsIds,
            };

            allChats.push(chat);
        });

        set({ chats: allChats, profiles: allMembers });
    },
    setCurrentChat: (chatId) => {
        set((state)=>{
            state.currentChat = chatId
            delete state.notification[chatId]
        });
    },
    setUser: (user) => {
        set((state) => {
            state.profiles[user.id] = user;
        });
    },
    getFirstParticipant: (chat) => {
        const profiles = get().profiles;
        const userId = get().userId;

        const participantId = chat.participants.filter((id) => {
            return id !== userId;
        })[0];

        return userId ? profiles[participantId] : USER_DEFAULTS;
    },
    getProfile: () => {
        const userId = get().userId;
        const profiles = get().profiles;

        return userId ? profiles[userId] : USER_DEFAULTS;
    },
    getCurrentChat: () => {
        const chats = get().chats;
        const currentChat = get().currentChat;

        return chats.find((chat) => chat.id === currentChat);
    },
    emitUserProfileUpdate: (userProfile) => {
        const ws = get().socket;
        ws.emit("user:profile-update", userProfile)
    }
});

export default globalStore;
