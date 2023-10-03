import express from "express";
import testController from "../../../controller/testController.js";
import auth from "../../../middleware/authMiddleware.js";

const test = express.Router();

test.route("/public")
    // @route  GET - /api/v1/test/public
    // @desc   GET - returns a json object letting the client know they have made a successful request.
    // @access Public
    .get(testController.publicController)

test.route("/private")
    // @route  GET - /api/v1/test/private
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Private
    .get(auth, testController.privateController)

export default test;