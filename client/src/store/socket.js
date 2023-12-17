import { BASE_URL } from "../utils/api";
import { io } from "socket.io-client";

let timeoutHandle = null;

export const socketSlice = (set, get) => ({
    connect: (token) => {
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
                });
            });

            ws.on("disconnect", () => {
                set((state) => {
                    state.socket = null;
                    state.isConnected = false;
                    state.user.online = false;
                    state.typing = {};
                });
            });

            ws.on("user:get-profile", (user) => {
                set((state) => {
                    state.user = { ...state.user, ...user };
                });
            });

            ws.on("user:profile-updated", (user) => {
                set((state) => {
                    const profile = state.profiles[user.id];

                    if (profile) {
                        state.profiles[user.id] = user;
                    }
                });
            });

            ws.on("user:connect", (id) => {
                set((state) => {
                    const profile = state.profiles[id];

                    if (profile) {
                        state.profiles[id].online = true;
                    }
                });
            });

            ws.on("user:disconnect", (id) => {
                set((state) => {
                    const profile = state.profiles[id];

                    if (profile) {
                        state.profiles[id].online = false;
                    }
                });
            });

            ws.on("connect_error", (error) => {
                console.error("WS Connection Error: ", error.message);
            });

            ws.on("chat:created", (chatData) => {
                const { participants, ...rest } = chatData;
                const userId = get().user.id;

                const Ids = participants
                    .map((person) => person.id)
                    .filter((id) => id !== userId);

                set((state) => {
                    for (const person of participants) {
                        if (person.id === userId) {
                            continue;
                        }
                        state.profiles[person.id] = person;
                    }

                    const formattedChatObj = {
                        participants: Ids,
                        ...rest,
                    };

                    state.chats.push(formattedChatObj);
                });

                ws.emit("chat:join", chatData.id);
            });

            ws.on("user:typing", ({ userId, chatId }) => {
                if (timeoutHandle) {
                    clearTimeout(timeoutHandle);
                }

                timeoutHandle = setTimeout(() => {
                    set((state) => {
                        delete state.typing[chatId];
                    });

                    timeoutHandle = null;
                }, 2000);

                set((state) => {
                    state.typing[chatId] = userId;
                });
            });

            ws.on("user:stopped-typing", ({ userId, chatId }) => {
                timeoutHandle = null;

                set((state) => {
                    delete state.typing[chatId];
                });
            });

            ws.on("message:receive", (message) => {
                const playNotification = get().playNotification;

                set((state) => {
                    if (message.chatId === state.selectedChat) {
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
    disconnect: () => {
        const socket = get().socket;

        if (socket) {
            socket.disconnect();
        }
    },
    emitUserProfileUpdate: (profile) => {
        const socket = get().socket;

        if (socket) {
            socket.emit("user:profile-update", profile);
        }
    },
    emitNewMessageCreated: (message) => {
        const socket = get().socket;

        if (socket) {
            socket.emit("message:send", message);
        }
    },
    emitNewChatCreated: (chat) => {
        const socket = get().socket;

        if (socket) {
            socket.emit("chat:create", chat);
        }
    },
    emitUserTyping: (chatId) => {
        const socket = get().socket;

        if (socket) {
            socket.emit("user:start-typing", chatId);
        }
    },
    emitUserStopTyping: (chatId) => {
        const socket = get().socket;

        if (socket) {
            socket.emit("user:stop-typing", chatId);
        }
    },
});
