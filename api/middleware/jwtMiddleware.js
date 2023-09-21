import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
    audience: "https://www.chatter.yeasirhugais.com/api",
    issuerBaseURL: "https://yeasirhugais.us.auth0.com/",
    algorithms: ["RS256"],
});