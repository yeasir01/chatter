import findOrCreateUser from "../services/findOrCreateUserService.mjs";
import ValidationError from "../errors/ValidationError.mjs";

const deserializeUser = async (req, res, next) => {
    try {
        const authId = req.auth?.payload?.sub;
        const token = req.auth?.token;

        if (!authId){
            throw new ValidationError("Auth ID missing. Unable to deserialize user.", "authId", authId)
        }

        if (!token){
            throw new ValidationError("Token missing.", "token", token)
        }

        const user = await findOrCreateUser(authId, token)
        req.user = user
        
        next()
    } catch (err) {
        next(err)
    }
}

export default deserializeUser;