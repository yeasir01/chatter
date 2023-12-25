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
    let status;

    // Extract the error message, defaulting to a generic message
    const message = err.message || err.msg || "Internal Server Error";

    // Check if the error is a Yup validation error
    if (err.name === "ValidationError" && err.inner) {
        status = 403;
        const validationErrors = {};
        
        // Extract validation errors from Yup validation error
        err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
        });

        // Send an error response with the specified status and validation errors
        return res.status(status).json({
            status: status,
            message: message,
            validationErrors: validationErrors,
        });
    } 

    status = err.statusCode || err.status || 500
    
    // Send an error response with the specified status and message
    res.status(status).json({
        status: status,
        message: message,
    });
    

    // Log the error for debugging and monitoring
    console.error(message);
};

export default errorHandler;
