import React from "react";
import { Container, Typography, Box } from "@mui/material";
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
            {messages.length === 0 ? (
                <Box sx={{textAlign: "center"}}>
                    <Typography variant="subtitle2" color="text.disabled">
                        Enter a message to start a conversation.
                    </Typography>
                </Box>
            ):(
                messages.map((message) => {
                    return (
                        <MessageBubble
                            component="li"
                            key={message.id}
                            message={message}
                        />
                    );
                })
            )}
            <div ref={lastMessageRef}></div>
        </Container>
    );
}

export default MessagePanelContent;
