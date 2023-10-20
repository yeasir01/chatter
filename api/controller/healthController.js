const getPublic = (req, res, next) => {
    res.status(200).json({message: "You've reached the public route."});
};

export default {
    getPublic,
};
