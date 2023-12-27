const getDetails = (req, res, next) => {
    const now = new Date();
    res.status(200).json({status: "OK", date: now});
};

export default {
    getDetails,
};
