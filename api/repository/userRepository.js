import { db } from "./index.js";

export default {
    findById: async (userId) => {
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
    },
    updateUser: async (data)=> {
        const { id, ...rest } = data;
        
        const user = await db.user.update({
            where: {
                id: data.id
            },
            data: {
                ...rest
            }
        })

        return user;
    },
    searchUsers: async (search, page, pageSize)=>{
        const pageNumber = parseInt(page || 1);
        const itemsPerPage = parseInt(pageSize || 10);

        const query = {
            skip: (pageNumber - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                picture: true
            }
        }

        if (search) {
            query.where = {
                OR: [
                    {firstName: {contains: search}},
                    {lastName: {contains: search}},
                    {username: {contains: search}},
                ]
            }
        }
    
        const users = await db.user.findMany(query)

        const totalUsers = await db.user.count();

        return {
            users: users,
            count: totalUsers
        }
    }
} 
