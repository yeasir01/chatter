
export const propSlice = (set) => ({
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
    snackbar: {
        open: false,
        message: "",
        severity: "error"
    }
});
