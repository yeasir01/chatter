import repo from "../repository/index.js";
import uploadToCloudinary from "../services/uploadToCloudinaryService.js";

const getProfile = (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        const formData = req.body;
        const file = req.file;

        const changes = {...formData, id};

        if (file) {
            const imgUrl = await uploadToCloudinary(file.buffer, "avatars", id);
            changes["picture"] = imgUrl;
        }

        //Save to db
        const updatedUser = await repo.user.updateProfile(changes);
        
        res.status(202).json(updatedUser)
    } catch (error) {
        next(error)
    }
};

const searchAllUsers = async (req, res, next) => {
    try {
        const { search, page, pageSize } = req.query;
        const id = req.user.id;
        const users = await repo.user.searchUsers(id, search, page, pageSize);
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export default {
    getProfile,
    updateProfile,
    searchAllUsers,
};
