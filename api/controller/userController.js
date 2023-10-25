import repo from "../repository/index.js"

const getProfile = (req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const formData = req.body;
        const file = req.file;
        //const updatedUser = await repo.user.updateUser(req.body);
        console.log("body:", formData)
        console.log("file", file)
        res.status(201).json("updatedUser")
    } catch (error) {
        next(error)
    }
};

const searchAllUsers = async (req, res, next) => {
    try {
        const { search, page, pageSize } = req.query;
        const users = await repo.user.searchUsers(search, page, pageSize);
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export default {
    getProfile,
    searchAllUsers,
    updateProfile
};
