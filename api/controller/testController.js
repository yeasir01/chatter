import formatResponse from "../utils/formatResponse.js";

const publicController = (req, res, next) => {
    res.status(200).send({
        msg: "You've reached the public route.",
        status: "ok",
    });
};

const privateController = (req, res, next) => {
    const data = {
        auth: req.auth, 
        user: req.user
    }
    
    const response = formatResponse( data, 200, "You've reached the private route.");
    res.status(response.statusCode).json(response);
};

export default {
    publicController,
    privateController,
};
