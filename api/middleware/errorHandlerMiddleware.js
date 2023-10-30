import express from "express";

/**
 * Express middleware for handling and responding to errors thrown
 *
 * @param {Error} err - The error object.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 *
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
    // Determine the HTTP status code for the response, defaulting to 500 (Internal Server Error)
    const status = err.status || err.statusCode || 500;

    // Extract the error message, defaulting to a generic message
    const message = err.message || "Internal Server Error";

    // Send an error response with the specified status and message
    res.status(status).send({
        status: status,
        message: message,
    });

    // Log the error for debugging and monitoring
    console.error(message);
};

export default errorHandler;