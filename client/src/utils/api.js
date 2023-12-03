
const BASE_URL =
    (process.env.NODE_ENV === "production")
        ? process.env.REACT_APP_API_SERVER
        : "";

export {
    BASE_URL
}