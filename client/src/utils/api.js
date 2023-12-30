const isProd = process.env.NODE_ENV === "production";

const BASE_URL = isProd ? process.env.REACT_APP_API_SERVER : "";

export { BASE_URL };
