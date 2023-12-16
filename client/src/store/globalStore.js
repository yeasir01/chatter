import { io } from "socket.io-client";
import { BASE_URL } from "../utils/api";
import audioPath from "../assets/audio/message-received.mp3";

const audio = new Audio(audioPath);

const props = Object.freeze({
    socket: null,
    user: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        bio: "",
        picture: "",
        status: null,
        online: true,
    },
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
        results: [],
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
});

let timeoutHandle = null;

const globalStore = (set, get) => ({
    ...props,
    initSocket: (token) => {
        const socket = get().socket;

        if (!socket) {
            const ws = io(BASE_URL, {
                auth: { token: `Bearer ${token}` },
            });

            ws.on("connect", () => {
                set((state) => {
                    state.socket = ws;
                    state.isConnected = true;
                    state.user.online = true;
                    return state;
                });
            });

            ws.on("disconnect", () => {
                set((state) => {
                    state.socket = null;
                    state.isConnected = false;
                    state.user.online = false;
                    state.typing = {};
                    return state;
                });
            });

            ws.on("user:get-profile", (user) => {
                set((state) => {
                    state.user = { ...state.user, ...user };
                    return state;
                });
            });

            ws.on("user:profile-updated", (user) => {
                set((state) => {
                    const profile = state.profiles[user.id];

                    if (profile) {
                        state.profiles[user.id] = { ...profile, ...user };
                    }

                    return state;
                });
            });

            ws.on("user:connect", (id) => {
                set((state) => {
                    const user = state.profiles[id];

                    if (user) {
                        state.profiles[id].online = true;
                    }

                    return state;
                });
            });

            ws.on("user:disconnect", (id) => {
                set((state) => {
                    const user = state.profiles[id];

                    if (user) {
                        state.profiles[id].online = false;
                    }
                    return state;
                });
            });

            ws.on("connect_error", (error) => {
                console.error("WS Connection Error: ", error.message);
            });

            ws.on("chat:created", (chatData) => {
                const addOneChat = get().addOneChat;

                addOneChat(chatData);
                ws.emit("chat:join", chatData.id);
            });

            ws.on("user:typing", ({ userId, chatId }) => {
                if (timeoutHandle) {
                    clearTimeout(timeoutHandle);
                }

                timeoutHandle = setTimeout(() => {
                    set((state) => {
                        delete state.typing[chatId];
                        return state;
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
                const playNotification = get().playNotification;
                const setChatsLastMessage = get().setChatsLastMessage;

                set((state) => {
                    if (message.chatId === state.selectedChat) {
                        state.messages.push(message);
                    } else {
                        state.notifications[message.chatId] =
                            (state.notifications[message.chatId] || 0) + 1;
                    }

                    setChatsLastMessage(message);
                    playNotification();
                    return state;
                });
            });
        }
    },

    setChats: (chats) => {
        if (!chats.length) {
            return;
        }

        const userId = get().user.id;
        const chatsArray = [];
        const profiles = {};

        chats.forEach(({ participants, ...rest }) => {
            const participantsId = [];

            for (const person of participants) {
                if (person.id === userId) {
                    continue;
                }
                profiles[person.id] = person;
                participantsId.push(person.id);
            }

            const formattedChatObject = {
                ...rest,
                participants: participantsId,
            };

            chatsArray.push(formattedChatObject);
        });

        set((state) => {
            state.chats = chatsArray;
            state.profiles = profiles;
            return state;
        });
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
    addOneChat: (chatObj) => {
        const { participants, ...rest } = chatObj;
        const userId = get().user.id;

        const participantsIds = participants
            .map((person) => {
                return person.id;
            })
            .filter((id) => id !== userId);

        set((state) => {
            for (const person of participants){
                if (person.id === userId) {
                    continue;
                }
                state.profiles[person.id] = person;
            }

            const formattedChatObj = {
                participants: participantsIds,
                ...rest,
            };

            state.chats.push(formattedChatObj);
        });
    },
    setMessages: (messages) => {
        set((state) => {
            state.messages = messages;
            return state;
        });
    },
    setChatsLastMessage: (msg) => {
        set((state) => {
            const chat = state.chats.find((chat) => chat.id === msg.chatId);

            if (chat) {
                chat.lastMessage = msg;
            }

            return state;
        });
    },
    addMessage: (message) => {
        set((state) => {
            state.messages.push(message);
        });
    },
    updateLastMessage: (message) => {
        set((state) => {
            state.chats.find((chat) => chat.id === message.chatId).lastMessage = message;
            return state;
        });
    },
    setTheme: (theme) => {
        set((state) => {
            state.deviceState.theme = theme;
            return state;
        });

        localStorage.setItem("theme", theme);
    },
    setSelectedChat: (chatId) => {
        const setUiState = get().setUiState;

        set((state) => {
            state.selectedChat = chatId; //Set selected chat
            state.notifications[chatId] = 0; //Clear notifications
            return state;
        });

        setUiState("messages");
    },
    setUserProfile: (user) => {
        set((state) => {
            state.user = user;
            return state;
        });
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
        set((state) => {
            state.chatSearch.term = value;
            return state;
        });
    },
    setChatResults: (list) => {
        set((state) => {
            state.chatSearch.results = list;
            return state;
        });
    },
    setSoundEnabled: (boolVal) => {
        set((state) => {
            state.deviceState.soundEnabled = boolVal;
            return state;
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
