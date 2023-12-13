import { createTheme } from "@mui/material/styles";

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
            light: "#f2f2f7",
            dark: "#c7c7cc",
            contrastText: "#000000"
        },
        background: {
            default: "#ecf0f1"
        },
        success: {
            main: "#27ae60"
        }
    }
});

export default light;