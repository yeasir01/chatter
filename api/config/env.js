import dotenv from "dotenv";

dotenv.config();

const variables = {
    SERVER_PORT: "",
    AUTH0_AUDIENCE: "",
    AUTH0_DOMAIN: "",
    CLOUDINARY_NAME: "",
    CLOUDINARY_API_KEY: "",
    CLOUDINARY_API_SECRET: "",
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
    console.error(error.message);
    process.exit(1);
}

export default variables;
