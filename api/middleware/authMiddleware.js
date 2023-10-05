import { createRemoteJWKSet, jwtVerify } from "jose";
import env from "../config/env.js"

const options = {
    issuer: env.AUTH0_DOMAIN + "/",
    audience: env.AUTH0_AUDIENCE,
    algorithms: ["RS256"],
    clockTolerance: `5 secs`,
}

const auth = async (req, res, next) => {
    try {
        const bearerToken = req?.headers?.authorization || req?.handshake?.auth?.token;
        
        if (!bearerToken){
            throw new Error("bearer token is missing")
        }

        const token = bearerToken.split(" ")[1];

        const JWKS = createRemoteJWKSet(new URL(`${env.AUTH0_DOMAIN}/.well-known/jwks.json`));
        
        const data = await jwtVerify(token, JWKS, options);
        const decodedPayload = data.payload
        const protectedHeader = data.protectedHeader

        req.auth = {
            header: protectedHeader,
            payload: decodedPayload,
            token: token
        }

        next()
    } catch (err) {
        err.status = 401
        next(err)
    }
}

export default auth;