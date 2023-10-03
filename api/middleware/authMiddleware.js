import { auth } from "express-oauth2-jwt-bearer";
import env from "../config/env.js";
import findOrCreateUser from "../services/userServices.js";
import express from "express";

/**
 * Middleware for decoding and verifying JWT tokens, and handling user creation.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * 
 * @returns {void}
 * 
 * @throws {Error} When authentication or user creation fails.
 */
const decodeJwt = (req, res, next) => {
    auth({
        audience: env.AUTH0_AUDIENCE,
        issuerBaseURL: env.AUTH0_DOMAIN,
        algorithms: ["RS256"],
    })(req, res, async () => {
        try {
            // Extract the authenticated user's ID and token
            const authId = req.auth.payload.sub
            const token = req.auth.token

            // Fetch or create the user based on the authID and token
            const user = await findOrCreateUser(authId, token)

            // Attach the user object to the request
            req.user = user;

            // Proceed to the next middleware or route handler
            next()
        } catch (error) {
            // Pass any errors to the error-handling middleware
            next(error)
        }
    });
};

export default decodeJwt;
