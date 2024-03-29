import express from "express";
import userController from "../../../controller/userController.mjs";
import handleFileUpload from "../../../middleware/handleFileUploadMiddleware.mjs";
import validate from "../../../middleware/validateMiddleware.mjs";
import userValidationSchema from "../../../validations/userValidationSchema.mjs";

const user = express.Router();

user.route("/users")
    // @route  GET - /api/v1/user/users?page=1&pageSize=10
    // @desc   GET - Get the first page of users with a page size of 10.
    // @route  GET - /api/v1/user/users?search=John
    // @desc   GET - Search for users by name, email or username.
    // @access Private
    .get(userController.searchAllUsers)

user.route("/profile")
    // @route  GET - /api/v1/user/profile
    // @desc   Returns the user object.
    // @access Private
    .get(userController.getProfile)
    // @route  PUT - /api/v1/user/profile
    // @desc   Updates user profile and returns updated record.
    // @access Private
    .patch(handleFileUpload, validate(userValidationSchema), userController.updateProfile)

export default user;