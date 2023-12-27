import repo from "../repository/index.js";
import env from "../config/env.js";

/**
 * Fetches the user if exists in db or will creates a user based on the
 * Auth0 authentication ID and token.
 *
 * @param {string} authId - The Auth0 authentication ID.
 * @param {string} token - The authentication access token for making requests.
 *
 * @returns {Promise<Object|null>} A Promise that resolves to the user object or null if not found.
 *
 * @throws {Error} When an error occurs during user creation or fetching.
 */
const findOrCreateUser = async (authId, token) => {
    try {
        // Attempt to find an existing user with the provided Auth0 authentication ID
        const user = await repo.user.findByAuthId(authId);

        if (user) { return user };

        // Configure options for making a request to Auth0's userinfo endpoint
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // Fetch user data from Auth0's userinfo endpoint
        const response = await fetch(
            `${env.AUTH0_DOMAIN}/userinfo`,
            fetchOptions
        );

        if (!response.ok) {
            const err = new Error();
            err.name = "HttpError";
            err.statusCode = response.status || 500;
            err.message = "Failed to fetch user data from auth server.";
            throw err;
        }

        const data = await response.json();

        const providers = ["google-oauth2"];
        const connection = data.sub.split("|")[0];

        // Prepare a new user object based on the fetched data
        const userObj = {
            authId: data["sub"],
            firstName: data["given_name"] || "",
            lastName: data["family_name"] || "",
            email: data["email"],
            username: data["nickname"] || data["username"] || "",
            picture: data["picture"],
            active: providers.includes(connection)
        };

        // Create the user in application's database
        const newUser = await repo.user.createUser(userObj);

        return newUser;
    } catch (error) {
        // Re-throw the error to indicate the operation failed
        throw error;
    }
};

export default findOrCreateUser;
