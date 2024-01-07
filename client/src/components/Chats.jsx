import React from "react";
import ChatsList from "./ChatsList.jsx";
import {
    LayoutContainer,
    LayoutHeader,
    LayoutContent,
} from "../layout/layout.jsx";
import ChatsHeader from "./ChatsHeader.jsx";

function Chats({ ...props }) {
    return (
        <LayoutContainer {...props} variant="outlined">
            <LayoutHeader>
                <ChatsHeader />
            </LayoutHeader>
            <LayoutContent>
                <ChatsList />
            </LayoutContent>
        </LayoutContainer>
    );
}

export default Chats;
