import crypto from "crypto";
import repo from "../repository/index.js";
import uploadToCloudinary from "../services/uploadToCloudinaryService.js";

const getChats = async (req, res, next) => {
    try {
        const chats = await repo.chat.findChatsByUserId(req.user.id);
        res.status(200).json(chats);
    } catch (error) {
        next(error)
    }
};

const createChat = async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.file;
        const loggedInUserId = req.user.id;
        const set = new Set(data.participants.split(","))
        const uuid = crypto.randomUUID();
        
        set.add(loggedInUserId)
        
        const record = {
            id: uuid,
            name: data.name,
            owner: loggedInUserId,
            group: set.size > 2,
            participants: [...set]
        };

        if (file){
            const imageURL = await uploadToCloudinary(file.buffer, "avatars", uuid);
            record["picture"] = imageURL;
        }
        
        const chat = await repo.chat.createNewChat(record);
        res.status(201).json(chat);
    } catch (error) {
        next(error)
    }
};

export default {
    getChats,
    createChat
};
