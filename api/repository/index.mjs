import { PrismaClient } from "@prisma/client";
import userRepository from "./userRepository.mjs";
import chatsRepository from "./chatsRepository.mjs";
import messageRepository from "./messageRepository.mjs";

const prisma = new PrismaClient();

const USER_SELECT = Object.freeze({
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    bio: true,
    picture: true,
    status: true,
    active: true
});

export {prisma as db, USER_SELECT };

export default {
    user: userRepository,
    chat: chatsRepository,
    message: messageRepository,
};
