import crypto from "crypto";
import repo from "../repository/index.mjs";
import uploadToCloudinary from "../services/uploadToCloudinaryService.mjs";

const createMessage = async (req, res, next) => {
    try {
        const uuid = crypto.randomUUID()
        const data = req.body;
        const file = req.file;
        const folder = `chats/${data.chatId}`

        const record = {
            id: uuid,
            content: data.content,
            chatId: data.chatId,
            senderId: req.user.id
        }

        if (file) {
            const imageURL = await uploadToCloudinary(file.buffer, folder, uuid);

            record["attachment"] = imageURL;
            record["mimeType"] = file.mimetype;
            record["fileName"] = file.originalname;
            record["fileSize"] = file.size;
        }

        const message = await repo.message.createNewMessage(record)
        res.status(201).json(message);
    } catch (error) {
        next(error)
    }
}

const getMessages = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        const message = await repo.message.getMessages(chatId)
        res.status(201).json(message);
    } catch (error) {
        next(error)
    }
}

export default {
    createMessage,
    getMessages
}