/**
 * A custom error class for authentication failures.
 *
 * @class AuthenticationError
 * @extends {Error}
 * @param {string} message - A description of the authentication error.
 */
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.status = 401; // Unauthorized
    }
}

export default AuthenticationError;