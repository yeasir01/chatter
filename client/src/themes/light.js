import { createTheme } from "@mui/material/styles";
import common from "./common.js";

const light = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#3498db",
            light: "#2f89c5",
            dark: "#246a99",
        },
        secondary: {
            main: "#e5e5ea",
            light: "#e8e8ec",
            dark: "#cbcbd5",
            contrastText: "#000000"
        },
        background: {
            default: "#ecf0f1"
        },
        success: {
            main: "#27ae60"
        },
    },
}, common);

export default light;