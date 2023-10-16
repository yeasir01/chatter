import formatResponse from "../utils/formatResponse.js";
import repo from "../repository/index.js"

const getProfile = (req, res, next) => {
    try {
        const response = formatResponse(req.user)
        res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await repo.user.updateUser(req.body);
        const response = formatResponse(updatedUser)
        res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
};

export default {
    getProfile,
    updateProfile
};
