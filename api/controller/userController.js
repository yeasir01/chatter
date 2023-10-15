import formatResponse from "../utils/formatResponse.js";

const getProfile = (req, res, next) => {
    try {
        const response = formatResponse(req.user)
        res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
};

export default {
    getProfile,
};
