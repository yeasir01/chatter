import { PrismaClient } from "@prisma/client";
import userRepository from "./userRepository.js";
import chatsRepository from "./chatsRepository.js";

const prisma = new PrismaClient();

export {prisma as db };

export default {
    user: userRepository,
    chat: chatsRepository,
};
