import db from "./index.js";

export default {
    findChatsByUserId: async (userId) => {
        const chats = await db.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "desc", // Optional: Order messages by creation date
                    },
                    take: 1, //returns last message
                },
            },
        });

        return chats;
    },
    getChatIdsByUserId: async (userId) => {
        const chats = await db.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        return chats.map(chat=> chat.id);
    },
};
