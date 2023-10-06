import db from "./index.js";

export default {
    findByAuthId: async (userId) => {
        const user = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        return user;
    },
    createUser: async (data) => {
        const user = await db.user.create({data});
        return user
    },
    updateIsOnline: async (userId, status = true) => {
        const user = await db.user.update({
            where: {
                id: userId
            },
            data: {
                online: status
            }
        })

        return user
    }
} 
