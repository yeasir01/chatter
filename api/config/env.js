"use strict";

const variables = {
    SERVER_PORT: null,
    AUTH0_AUDIENCE: null,
    AUTH0_DOMAIN: null,
    CLOUDINARY_NAME: null,
    CLOUDINARY_API_KEY: null,
    CLOUDINARY_API_SECRET: null,
};

try {
    for (const key in variables) {
        const value = process.env[key];

        if (!value) {
            throw new Error(`The required environment variable ${key} is not set.`);
        }

        variables[key] = value;
    }
} catch (error) {
    console.error(error);
    process.exit(1);
}

export default variables;
