import express from "express";
import { publicController, privateController } from "../../../controller/testController.js";
import { jwtCheck } from "../../../middleware/authMiddleware.js";

const test = express.Router();

test.route("/public")
    // @route  GET - /api/v1/test/public
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Public
    .get(publicController)

test.route("/private")
    // @route  GET - /api/v1/test/private
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Private
    .get(jwtCheck, privateController)

export default test;