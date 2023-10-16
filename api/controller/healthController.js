import formatResponse from "../utils/formatResponse.js";

const getPublic = (req, res, next) => {
    const response = formatResponse("", 200, "You've reached the public route.");
    res.status(response.statusCode).json(response);
};

const getPrivate = (req, res, next) => {
    const response = formatResponse(req.auth, 200, "You've reached the private route.");
    res.status(response.statusCode).json(response);
};

export default {
    getPublic,
    getPrivate,
};
