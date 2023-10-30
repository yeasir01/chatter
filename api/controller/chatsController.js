import crypto from "crypto";
import chatsRepository from "../repository/chatsRepository.js";
import uploadToCloudinary from "../services/uploadToCloudinaryService.js";

const getChats = async (req, res, next) => {
    try {
        const chats = await chatsRepository.findChatsByUserId(req.user.id);
        res.status(200).json(chats);
    } catch (error) {
        next(error)
    }
};

const createChat = async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.file;
        const userId = req.user.id;
        const set = new Set(data.participants.split(","))
        const uuid = crypto.randomUUID();
        
        set.add(userId)
        
        const record = {
            id: uuid,
            name: data.name,
            owner: userId,
            group: set.size > 2,
            participants: [...set]
        };

        if (file){
            const imageURL = await uploadToCloudinary(file.buffer, "avatar", uuid);
            record["picture"] = imageURL;
        }
        
        const chat = await chatsRepository.createNewChat(record);
        res.status(201).json(chat);
    } catch (error) {
        next(error)
    }
};

export default {
    getChats,
    createChat
};
