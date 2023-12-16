import { USER_SELECT, db } from "./index.js";

export default {
    findByAuthId: async (authId) => {
        const user = await db.user.findFirst({
            where: { authId },
            select: USER_SELECT
        });

        return user;
    },
    createUser: async (userObj) => {
        const user = await db.user.create({ 
            data: userObj,
            select: USER_SELECT
        });
        return user;
    },
    updateProfile: async (profile) => {
        const { id, ...rest } = profile;

        const user = await db.user.update({
            where: {
                id: id,
            },
            data: {
                ...rest,
            },
            select: USER_SELECT,
        });

        return user;
    },
    searchUsers: async (userId, search, page, pageSize) => {
        const pageNumber = parseInt(page || 1);
        const itemsPerPage = parseInt(pageSize || 10);

        const query = {
            skip: (pageNumber - 1) * itemsPerPage,
            take: itemsPerPage,
            select: USER_SELECT,
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
