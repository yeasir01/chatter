import React from "react";
import { Container } from "@mui/material";
import MessageBubble from "./MessageBubble";
import useStore from "../hooks/useStore.js";

function MessagePanelContent() {
    const messages = useStore((state) => state.messages);
    const lastMessageRef = React.useRef(null);

    React.useLayoutEffect(() => {
        lastMessageRef.current.scrollIntoView();
    }, []);

    React.useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Container>
            {messages.map((message) => {
                return (
                    <MessageBubble
                        component="li"
                        key={message.id}
                        data={message}
                    />
                );
            })}
            <div ref={lastMessageRef}></div>
        </Container>
    );
}

export default MessagePanelContent;
