import React from "react";
import { LayoutContainer } from "../layout/layout.jsx";
import { Typography, Box } from "@mui/material";
import Logo from "./Logo.jsx";

function NoConversationSelected() {
    return (
        <LayoutContainer sx={{justifyContent: "center", alignItems: "center"}}>
            <Box sx={{textAlign: "center"}}>
                <Logo color="text.disabled" sx={{fontSize:"3rem"}}/>
                <Typography color="text.disabled">Send and receive messages</Typography>
                <Typography color="text.disabled">Start a chat</Typography>
            </Box>
        </LayoutContainer>
    );
}

export default NoConversationSelected;