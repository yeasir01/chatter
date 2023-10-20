import chatsRepository from "../repository/chatsRepository.js";

const getChats = async (req, res, next) => {
    try {
        const chats = await chatsRepository.findChatsByUserId(req.user.id);
        res.status(200).json(chats);
    } catch (error) {
        next(error)
    }
};

export default {
    getChats,
};
