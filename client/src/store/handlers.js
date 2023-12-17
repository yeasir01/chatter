import audioPath from "../assets/audio/message-received.mp3";

const audio = new Audio(audioPath);

export const handlerSlice = (set, get) => ({
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
    setMessages: (messages) => {
        set((state) => {
            state.messages = messages;
        });
    },
    setChatsLastMessage: (msg) => {
        set((state) => {
            state.chats.find((chat) => chat.id === msg.chatId).lastMessage =
                msg;
        });
    },
    addMessage: (message) => {
        set((state) => {
            state.messages.push(message);
        });
    },
    updateLastMessage: (message) => {
        set((state) => {
            state.chats.find((chat) => chat.id === message.chatId).lastMessage =
                message;
        });
    },
    setTheme: (theme) => {
        set((state) => {
            state.deviceState.theme = theme;
        });

        localStorage.setItem("theme", theme);
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
            state.user = { ...state.user, ...user };
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
    setChatTerm: (value) => {
        set((state) => {
            state.chatSearch.term = value;
        });
    },
    setChatResults: (list) => {
        set((state) => {
            state.chatSearch.results = list;
        });
    },
    setSoundEnabled: (boolVal) => {
        set((state) => {
            state.deviceState.soundEnabled = boolVal;
        });

        localStorage.setItem("soundEnabled", JSON.stringify(boolVal));
    },
  })