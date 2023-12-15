import { io } from "socket.io-client";
import { BASE_URL } from "../utils/api";
import audioPath from "../assets/audio/message-received.mp3";

const audio = new Audio(audioPath);

const initProps = {
    socket: null,
    userId: null,
    isConnected: false,
    chats: [],
    messages: [],
    profiles: {},
    notifications: {},
    selectedChat: null,
    typing: {},
    isLoading: false,
    error: null,
    chatSearch: {
        term: "",
        results: []
    },
    uiState: {
        modal: null,
        isChatOpen: false,
        active: "chats",
    },
    deviceState: {
        soundEnabled: JSON.parse(localStorage.getItem("soundEnabled")) || true,
        theme: localStorage.getItem("theme") || "light",
    },
};

let timeoutHandle = null;

const globalStore = (set, get) => ({
    ...initProps,
    initSocket: (token) => {
        const socket = get().socket;

        if (!socket) {
            const ws = io(BASE_URL, {
                auth: { token: `Bearer ${token}` },
            });

            ws.on("connect", () => {
                set({ socket: ws, isConnected: true });
            });

            ws.on("disconnect", () => {
                set({ socket: null, isConnected: false, typing: {}});
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

            ws.on("user:typing", ({ userId, chatId }) => {
                if (timeoutHandle) {
                    clearTimeout(timeoutHandle);
                }
                
                timeoutHandle = setTimeout(() => {
                    set((state) => {
                        delete state.typing[chatId];
                        return state
                    });

                    timeoutHandle = null;
                }, 2000);

                set((state) => {
                    state.typing[chatId] = userId;
                    return state;
                });
            });

            ws.on("user:stopped-typing", ({ userId, chatId }) => {
                timeoutHandle = null;

                set((state) => {
                    delete state.typing[chatId];
                    return state;
                });
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

    setUiState: (ui = "chats") => {
        set((state) => {
            state.uiState.active = ui;
        });
    },
    setModal: (modalName = null) => {
        set((state) => {
            state.uiState.modal = modalName;
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

            state.chats.push({ ...rest, participants: participantsIds });
        });
    },
    setMessages: (messages) => {
        set((state) => {
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
        set((state) => {
            state.deviceState.theme = theme;
        });
        localStorage.setItem("theme", theme);
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
        const setUiState = get().setUiState;

        set((state) => {
            state.selectedChat = chatId; //Set selected chat
            state.notifications[chatId] = 0; //Clear notifications
        });

        setUiState("messages");
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
    playNotification: async () => {
        const soundEnabled = get().deviceState.soundEnabled;

        if (soundEnabled) {
            try {
                audio.currentTime = 0;
                await audio.play();
            } catch (err) {
                console.log(err);
            }
        }
    },
    disconnect: () => {
        const ws = get().socket;
        ws?.disconnect();
    },
    setChatTerm: (value) => {
        set((state)=> {
            state.chatSearch.term = value;
            return state;
        })
    },
    setChatResults: (value) => {
        set((state)=> {
            state.chatSearch.results = value;
            return state;
        })
    },
    setSoundEnabled: (boolVal) => {
        set((state) => {
            state.deviceState.soundEnabled = boolVal;
        });
        localStorage.setItem("soundEnabled", JSON.stringify(boolVal));
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
    emitUserTyping: (chatId) => {
        const ws = get().socket;
        ws.emit("user:start-typing", chatId);
    },
    emitUserStopTyping: (chatId) => {
        const ws = get().socket;
        ws.emit("user:stop-typing", chatId);
    },
});

export default globalStore;
