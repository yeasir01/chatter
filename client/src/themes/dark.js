import { createTheme } from "@mui/material/styles";

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
            light: "#5f5f65",
            dark: "#020202",
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
});

export default dark;