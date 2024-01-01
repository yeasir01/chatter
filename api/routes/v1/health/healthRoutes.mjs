import express from "express";
import healthController from "../../../controller/healthController.mjs";

const health = express.Router();

health.route("/")
    // @route  GET - /api/v1/health
    // @desc   Returns a json object letting the client know they have made a successful request.
    // @access Public
    .get(healthController.getStatus)

export default health;