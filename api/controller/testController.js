const publicController = (req, res, next) => {
    res.status(200).send({
        msg: "You've reached the public route.",
        status: "ok",
    });
};

const privateController = (req, res, next) => {
    res.status(200).send({
        msg: "You've reached the private route.",
        status: "ok",
        auth: req.auth,
        user: req.user
    });
};

export default {
    publicController,
    privateController
}