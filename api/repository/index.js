import { PrismaClient } from "@prisma/client";
import userRepository from "./userRepository.js";

const prisma = new PrismaClient();

export default prisma;

export {
    userRepository as user,
    prisma as db
};
