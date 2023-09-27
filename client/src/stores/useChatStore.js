import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/* 
//Sample data

chats: [
    {
        id: 101,
        participants: [1, 2], // User IDs of participants in the chat
        type: "group", // or 'one-on-one'
        name: "Project Team Chat",
        lastMessage: null, // Initially no last message
    },
    // Other chat objects
],
messagesByChatId: {
    101: [
        // Array of messages for chat with ID 101
        {
            id: 1001,
            sender: 1,
            content: "Hi, everyone!",
            timestamp: "2023-09-23T10:01:00Z",
        },
        // Other messages for this chat
    ],
    // Other chat message arrays
},
typing: {
    userId: 2, // User ID of the person typing
    chatId: 101, // Chat ID where typing is happening
    isTyping: true, // or false
},
onlineUsers: [
    {
        id: 2,
        username: "jane_smith",
        // Other user information
    },
    // Other online users
],
notifications: [
    {
        type: "message",
        content: "You have a new message from Jane Smith",
        timestamp: "2023-09-23T11:30:00Z",
    },
    // Other notification objects
],
uiState: {
    isChatOpen: true,
    activeTab: "chats", // or 'contacts' or 'notifications'
},
isLoading: false,
error: null,

 */
const IS_DEV = process.env.NODE_ENV === "development" 

const initProps = {
    socket: null,
    chats: [],
    currentChat: null,
    messages: [],
    typing: null,
    onlineUsers: [],
    notification: [],
    uiState: {
        isChatOpen: false,
        activeTab: "chats",
    },
    isLoading: false,
    error: null,
};

// immer middleware handles state immutability for us.
const useChatStore = create(
    devtools(immer((set, get) => ({
        ...initProps,
    })), {enabled: IS_DEV})
);

export default useChatStore;