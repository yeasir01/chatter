import { PrismaClient } from "@prisma/client";
import userRepository from "./userRepository.js";
import chatsRepository from "./chatsRepository.js";
import messageRepository from "./messageRepository.js";

const prisma = new PrismaClient();

const USER_SELECT = Object.freeze({
    id: true,
    authId: false,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    bio: true,
    picture: true,
    online: true,
    status: true,
    appMeta: false,
    createdAt: false,
    updatedAt: false,
});

export {prisma as db, USER_SELECT };

export default {
    user: userRepository,
    chat: chatsRepository,
    message: messageRepository,
};
