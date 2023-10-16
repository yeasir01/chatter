import express from "express";
import healthController from "../../../controller/healthController.js";
import auth from "../../../middleware/authMiddleware.js";

const health = express.Router();

health.route("/public")
    // @route  GET - /api/v1/health/public
    // @desc   GET - returns a json object letting the client know they have made a successful request.
    // @access Public
    .get(healthController.getPublic)

health.route("/private")
    // @route  GET - /api/v1/health/private
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Private
    .get(auth, healthController.getPrivate)

export default health;