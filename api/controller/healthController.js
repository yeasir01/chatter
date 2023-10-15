import formatResponse from "../utils/formatResponse.js";

const publicHealthController = (req, res, next) => {
    res.status(200).send({
        msg: "You've reached the public route.",
        status: "ok",
    });
};

const privateHealthController = (req, res, next) => {
    const data = {
        auth: req.auth, 
        user: req.user
    }
    
    const response = formatResponse( data, 200, "You've reached the private route.");
    res.status(response.statusCode).json(response);
};

export default {
    publicHealthController,
    privateHealthController,
};
