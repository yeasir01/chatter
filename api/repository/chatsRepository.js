import { db } from "./index.js";

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

        //Flatten array
        return chats.map(chat=> chat.id);
    },
    createNewChat: async (payload) => {
        const ps = payload.participants.map((id)=>{
            return {userId: id}
        })  
        
        const chat = await db.chat.create({
            data: {
                name: payload.name,
                group: payload.group,
                adminId: payload.admin,
                participants: {
                    create: ps
                }
            }
        })

        return chat;
    }
};
