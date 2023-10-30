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
                participants: {
                    select: {
                        user: true
                    },
                }
            }
        });

        const formattedChats = chats.map((record)=>{
            const {messages, participants, ...rest} = record;

            return {
                ...rest,
                lastMessage: messages[0],
                participants: participants.map((participant)=>{
                    return participant.user
                })
            }
        })

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
        return chats.map(chat=> chat.id);
    },
    createNewChat: async (payload) => {
        const ps = payload.participants.map((id)=>{
            return {userId: id}
        })  
        
        const chat = await db.chat.create({
            data: {
                id: payload.id,
                name: payload.name,
                group: payload.group,
                owner: payload.owner,
                picture: payload.picture,
                participants: {
                    create: ps
                },
            },
            include: {
                participants: {
                    select: {
                        user: true
                    },
                }
            }
        })

        chat.participants = chat.participants.map((participant)=>{
            return participant.user
        })

        return chat;
    }
};

/* const deleteChat = async (chatIdToDelete) => {
    try { 
        const deletedChat = await db.chat.delete({
            where: {
                id: chatIdToDelete,
            },
            include: {
                participants: true, // This includes the associated participant records
          },
        });
        
        console.log(`Deleted chat: ${JSON.stringify(deletedChat, null, 2)}`);
    } catch (error) {
        console.log(error)
    }
}

setTimeout(()=> deleteChat("ce10dd2f-45bd-4b8e-b8fe-a3d4269cf432"), 5000); */