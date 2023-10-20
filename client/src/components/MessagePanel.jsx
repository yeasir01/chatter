import React from "react";
import MessagePanelHeader from "./MessagePanelHeader.jsx";
import MessagePanelFooter from "./MessagePanelFooter.jsx";
import MessagePanelContent from "./MessagePanelContent.jsx";
import { ParentDiv, Header, Content, Footer } from "../layout/layout.jsx";
import { Divider } from "@mui/material";

function MessagePanel() {
    return (
        <ParentDiv>
            <Header>
                <MessagePanelHeader />
            </Header>
            <Divider />
            <Content sx={{p:2}}>
                <MessagePanelContent />
            </Content>
            <Divider />
            <Footer>
                <MessagePanelFooter />
            </Footer>
        </ParentDiv>
    );
}

export default MessagePanel;
