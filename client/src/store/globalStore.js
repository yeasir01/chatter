import { io } from "socket.io-client";

const initProps = {
    socket: null,
    userId: null,
    isConnected: false,
    chats: [],
    messages: [],
    profiles: {},
    notifications: {},
    selectedChat: null,
    typing: null,
    isLoading: false,
    error: null,
    uiState: {
        modal: null,
        isChatOpen: false,
        active: "chats",
    },
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

            ws.on("user:get-profile", (user) => {
                set((state) => {
                    state.profiles[user.id] = user;
                    state.profiles[user.id].online = true;
                    state.userId = user.id;
                });
            });

            ws.on("user:profile-updated", (user) => {
                set((state) => {
                    state.profiles[user.id] = user;
                });
            });

            ws.on("user:connect", (id) => {
                const user = get().profiles[id];

                if (user) {
                    set((state) => {
                        state.profiles[id].online = true;
                    });
                }
            });

            ws.on("user:disconnect", (id) => {
                const user = get().profiles[id];

                if (user) {
                    set((state) => {
                        state.profiles[id].online = false;
                    });
                }
            });

            ws.on("connect_error", (error) => {
                console.error("WS Connection Error: ", error.message);
            });

            ws.on("chat:created", (chatData) => {
                const addNewChat = get().addNewChat;

                addNewChat(chatData);
                ws.emit("chat:join", chatData.id);
            });

            ws.on("message:receive", (message) => {
                const selectedChat = get().selectedChat;
                const playNotification = get().playNotification;

                set((state) => {
                    if (message.chatId === selectedChat) {
                        state.messages.push(message);
                    } else {
                        state.notifications[message.chatId] =
                            (state.notifications[message.chatId] || 0) + 1;
                    }

                    state.chats.find(
                        (chat) => chat.id === message.chatId
                    ).lastMessage = message;
                    playNotification();
                });
            });
        }
    },


    updateUi: (ui = "view:chat", openChat = true) => {
        set({ uiState: { isChatOpen: openChat, active: ui } });
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

            allChats.unshift(chat);
        });

        set({ chats: allChats, profiles: allMembers });
    },


    
    setModal: (modalName = null) => {
        set((state)=>{
            state.uiState.modal = modalName
        });
    },
    addNewChat: (chatObj) => {
        const { participants, ...rest } = chatObj;

        const participantsIds = participants.map((person) => {
            return person.id;
        });

        set((state) => {
            participants.forEach((person) => {
                state.profiles[person.id] = person;
            });

            state.chats.unshift({ ...rest, participants: participantsIds });
        });
    },
    setMessages: (messages) => {
        set((state)=>{
            state.messages = messages;
        });
    },
    addMessage: (message) => {
        set((state) => {
            state.messages.push(message);
        });
    },
    updateLastMessage: (message) => {
        set((state) => {
            const chat = state.chats.find((chat) => chat.id === message.chatId);
            chat.lastMessage = message;
        });
    },
    setTheme: (theme) => {
        set((state)=>{
            state.deviceState.theme = theme;
        })
    },
    getParticipant: (chat) => {
        if (!chat) return;

        const profiles = get().profiles;
        const userId = get().userId;

        const id = chat.participants.filter((id) => {
            return id !== userId;
        })[0];

        return profiles[id];
    },
    setSelectedChat: (chatId) => {
        set((state) => {
            state.selectedChat = chatId; //Set selected chat
            state.notifications[chatId] = 0; //Clear notifications
        });
    },
    setUserProfile: (user) => {
        set((state) => {
            state.profiles[user.id] = user;
        });
    },
    getUserProfile: (id) => {
        const profiles = get().profiles;
        return profiles[id];
    },
    getCurrentChatProfile: () => {
        const chats = get().chats;
        const selectedChat = get().selectedChat;

        return chats.find((chat) => chat.id === selectedChat);
    },
    playNotification: () => {
        const soundEnabled = get().deviceState.soundEnabled;

        if (soundEnabled) {
            const audio = document.getElementById("audio");
            audio.currentTime = 0;
            audio.play();
        }
    },
    disconnect: () => {
        const ws = get().socket;
        ws?.disconnect();
    },
    setSoundEnabled: (boolVal) => {
        set((state)=>{
            state.deviceState.soundEnabled = boolVal
        })
    },
    emitUserProfileUpdate: (profile) => {
        const ws = get().socket;
        ws.emit("user:profile-update", profile);
    },
    emitNewMessageCreated: (message) => {
        const ws = get().socket;
        ws.emit("message:send", message);
    },
    emitNewChatCreated: (chat) => {
        const ws = get().socket;
        ws.emit("chat:create", chat);
    },
});

export default globalStore;
