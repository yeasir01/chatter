import express from "express";
import chatsController from "../../../controller/chatsController.js";

const chat = express.Router();

chat.route("/chats")
    // @route  GET - /api/v1/chat/chats
    // @desc   GET - Search for users by name, email or username.
    // @access Private
    .get(chatsController.getChats)

export default chat;