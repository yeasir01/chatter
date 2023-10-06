import { PrismaClient } from "@prisma/client";
import userRepository from "./userRepository.js";
import chatsRepository from "./chatsRepository.js";

const prisma = new PrismaClient();

export default prisma;

export {
    userRepository as user,
    chatsRepository as chats,
    prisma as db
};
