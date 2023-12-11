import React from "react";
import { LayoutContainer } from "../layout/layout.jsx";
import { Box } from "@mui/material";
import Logo from "./Logo.jsx";

function NoConversationSelected() {
    return (
        <LayoutContainer sx={{justifyContent: "center", alignItems: "center"}} variant="outlined">
            <Box sx={{textAlign: "center", padding: 2, userSelect: "none"}}>
                <Logo color="divider" sx={{fontSize:"3.5rem"}}/>
            </Box>
        </LayoutContainer>
    );
}

export default NoConversationSelected;