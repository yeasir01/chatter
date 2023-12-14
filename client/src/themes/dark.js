import { createTheme } from "@mui/material/styles";
import common from "./common.js";

const dark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#007aff",
            light: "#69b6ff",
            dark: "#0057a9",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#404044",
            light: "#525257",
            dark: "#3a3a3d",
            contrastText: "#FFFFFF"
        },
        success: {
            main: "#27cd41"
        },
        background: {
            paper: "#1c1c1e",
            default: "#000000",
        },
    },
}, common);

export default dark;