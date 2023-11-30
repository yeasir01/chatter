import express from "express";
import chatsController from "../../../controller/chatController.js";
import handleFileUpload from "../../../middleware/handleFileUploadMiddleware.js";

const chat = express.Router();

chat.route("/")
    // @route  POST - /api/v1/chat
    // @desc   create a new chat group.
    // @access Private
    .post(handleFileUpload, chatsController.createChat)


chat.route("/chats")
    // @route  GET - /api/v1/chat/chats
    // @desc   Search for users by name, email or username.
    // @access Private
    .get(chatsController.getChats)

export default chat;