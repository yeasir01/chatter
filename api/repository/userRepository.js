import { db } from "./index.js";

export default {
    findByAuthId: async (authId) => {
        const user = await db.user.findFirst({
            where: { authId },
        });
        return user;
    },
    createUser: async (data) => {
        const user = await db.user.create({ data });
        return user;
    },
    updateIsOnline: async (userId, status = true) => {
        const user = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                online: status,
            },
        });

        return user;
    },
    updateProfile: async (data) => {
        const { id, ...rest } = data;

        const user = await db.user.update({
            where: {
                id: id,
            },
            data: {
                ...rest,
            },
        });

        return user;
    },
    searchUsers: async (userId, search, page, pageSize) => {
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
                picture: true,
            },
            where: {
                NOT: {
                    id: userId,
                },
            },
        };

        if (search) {
            query.where.OR = [
                {
                    firstName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    lastName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    username: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];
        }
        
        const users = await db.user.findMany(query);

        const totalUsers = await db.user.count();

        return {
            users: users,
            count: totalUsers,
        };
    },
};
