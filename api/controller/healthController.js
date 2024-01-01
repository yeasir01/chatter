const getStatus = (req, res, next) => {
    res.status(200).send("OK");
};

export default {
    getStatus,
};
