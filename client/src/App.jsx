//Module Import
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

//Utility import
import theme from "./themes";
import useStore from "./hooks/useStore";

// React component import
import TestPage from "./pages/TestPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    const themeState = useStore((state)=>state.deviceState.theme)
    
    return (
        <ThemeProvider theme={theme[themeState]}>
            <CssBaseline />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="test" element={<TestPage />} />
                    <Route path="dashboard/*" element={<DashboardPage />}>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
        </ThemeProvider>
    );
}

export default App;
