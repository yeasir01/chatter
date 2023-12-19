import React from "react";
import { FlexCenterContainer } from "../layout/layout.jsx"
import { LayoutContainer } from "../layout/layout.jsx";
import {Typography } from "@mui/material";

function NoConversationSelected() {
    return (
        <LayoutContainer variant="outlined">
            <FlexCenterContainer>
                <Typography variant="h5" color="secondary" sx={{userSelect: "none", fontWeight: "bold"}}>
                    No Conversation Selected
                </Typography>
            </FlexCenterContainer>
        </LayoutContainer>
    );
}

export default NoConversationSelected;
