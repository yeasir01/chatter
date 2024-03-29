import express from "express";
import messageController from "../../../controller/messageController.mjs";
import handleFileUpload from "../../../middleware/handleFileUploadMiddleware.mjs";

const message = express.Router();

message.route("/")
    // @route  POST - /api/v1/message
    // @desc   create a new message.
    // @access Private
    .post(handleFileUpload, messageController.createMessage)

message.route("/chat/:chatId")
    // @route  POST - /api/v1/message/chat/[chatId]
    // @desc   retrieve all messages for a given chatId.
    // @access Private
    .get(messageController.getMessages)

export default message;