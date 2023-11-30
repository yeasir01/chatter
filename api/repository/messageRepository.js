import { db } from "./index.js";

export default {
    createNewMessage: async (payload) => {
        const message = await db.message.create({ data: payload });
        return message;
    },
    getMessages: async (chatId) => {
        const messages = await db.message.findMany({
            where: {
                chatId: chatId,
            },
        });

        return messages;
    },
};
