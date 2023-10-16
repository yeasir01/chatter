import express from "express";
import userController from "../../../controller/userController.js";

const user = express.Router();

user.route("/profile")
    // @route  GET - /api/v1/user/profile
    // @desc   GET - returns a user object.
    // @access Private
    .get(userController.getProfile)
    // @route  PUT - /api/v1/user/profile
    // @desc   PUT - returns a user object.
    // @access Private
    .put(userController.updateProfile)

export default user;