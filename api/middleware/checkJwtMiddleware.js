import { auth } from "express-oauth2-jwt-bearer";
import env from "../config/env.js"

//Express middleware
const checkJWT = auth({
    audience: env.AUTH0_AUDIENCE,
    issuerBaseURL: env.AUTH0_DOMAIN,
    algorithms: ["RS256"],
});

export default checkJWT;