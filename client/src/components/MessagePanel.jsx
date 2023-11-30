import React from "react";
import MessagePanelHeader from "./MessagePanelHeader.jsx";
import MessagePanelFooter from "./MessagePanelFooter.jsx";
import MessagePanelContent from "./MessagePanelContent.jsx";
import { LayoutContainer, LayoutHeader, LayoutContent, LayoutFooter } from "../layout/layout.jsx";
import { Divider } from "@mui/material";

function MessagePanel() {
    return (
        <LayoutContainer>
            <LayoutHeader>
                <MessagePanelHeader />
            </LayoutHeader>
            <Divider />
            <LayoutContent sx={{p:2}}>
                <MessagePanelContent />
            </LayoutContent>
            <Divider />
            <LayoutFooter>
                <MessagePanelFooter />
            </LayoutFooter>
        </LayoutContainer>
    );
}

export default MessagePanel;
