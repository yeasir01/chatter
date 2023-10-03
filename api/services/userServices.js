import { user } from "../repository/index.js"
import env from "../config/env.js";

/**
 * Fetches or creates a user based on the Auth0 authentication ID and token.
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
        const existingUser = await user.findByAuthId(authId);

        if (existingUser) {
            // Return the existing user if found
            return existingUser
        }
        
        // Configure options for making a request to Auth0's userinfo endpoint
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // Fetch user data from Auth0's userinfo endpoint
        const response = await fetch(`${env.AUTH0_DOMAIN}/userinfo`, fetchOptions);
        const data = await response.json();
        
        // Prepare a new user object based on the fetched data
        const newUser = {
            authId: data["sub"],
            firstName: data["given_name"] || "",
            lastName: data["family_name"] || "",
            email: data["email"],
            username: data["nickname"] || data["username"] || "",
            picture: data["picture"],
        }

        // Create the user in application's database
        const createdUser = await user.createUser(newUser);

        return createdUser;
        
    } catch (error) {
        // Re-throw the error to indicate the operation failed
        throw error;
    }
}

export default findOrCreateUser;