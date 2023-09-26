import dotenv from "dotenv";

dotenv.config();

const variables = {
    SERVER_PORT: undefined,
    AUTH0_AUDIENCE: undefined,
    AUTH0_DOMAIN: undefined,
};

try {
    for (const key in variables) {
        const value = process.env[key];

        if (value === undefined) {
            throw new Error(`The required environment variable ${key} is not set.`);
        }

        variables[key] = value;
    }
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

export default variables;
