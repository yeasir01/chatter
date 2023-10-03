import db from "./index.js";

export default {
    findByAuthId: async (authId) => {
        const user = await db.user.findFirst({
            where: {
                authId: authId
            }
        })
        return user;
    },
    createUser: async (data) => {
        const user = await db.user.create({data});
        return user
    }
} 
