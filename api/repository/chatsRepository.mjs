import { db, USER_SELECT } from "./index.mjs";
import store from "../utils/userStore.mjs";

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
                participants: {
                    select: {
                        user: {
                            select: USER_SELECT,
                        },
                    },
                },
            },
        });

        const formattedChats = chats.map((record) => {
            const { messages, participants, ...rest } = record;

            return {
                ...rest,
                lastMessage: messages[0],
                participants: participants.map(({user}) => {
                    return {
                        ...user,
                        online: store.userIsOnline(user.id)
                    }
                }),
            };
        });

        return formattedChats;
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

        //Flatten array and return
        return chats.map((chat) => chat.id);
    },
    createNewChat: async (payload) => {
        const participants = payload.participants.map((id) => {
            return { userId: id };
        });

        const chat = await db.chat.create({
            data: {
                id: payload.id,
                name: payload.name,
                group: payload.group,
                owner: payload.owner,
                picture: payload.picture,
                participants: {
                    create: participants,
                },
            },
            include: {
                participants: {
                    select: {
                        user: {
                            select: USER_SELECT
                        }
                    },
                },
            },
        });

        chat.participants = chat.participants.map(({user}) => {
            return {
                ...user,
                online: store.userIsOnline(user.id)
            }
        });

        return chat;
    },
};
