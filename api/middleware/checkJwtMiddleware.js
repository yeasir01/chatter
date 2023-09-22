import { auth } from "express-oauth2-jwt-bearer";

//Express middleware
const checkJWT = auth({
    audience: "https://www.chatter.yeasirhugais.com/api",
    issuerBaseURL: "https://yeasirhugais.us.auth0.com/",
    algorithms: ["RS256"],
});

export default checkJWT;