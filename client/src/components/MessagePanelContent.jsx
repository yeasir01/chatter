import React from "react";
import { Container, Typography } from "@mui/material";
import MessageBubble from "./MessageBubble";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import Loader from "./Loader.jsx";

function MessagePanelContent() {
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const selectedChat = useStore((state) => state.selectedChat);

    const bottomRef = React.useRef(null);

    const { handleFetch, error, loading } = useFetch();

    React.useEffect(() => {
        const fetchMessages = async (chatId) => {
            if (!chatId) return;

            try {
                setMessages([]);
                const msgs = await handleFetch(
                    `/api/v1/message/chat/${chatId}`
                );
                setMessages(msgs);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMessages(selectedChat);
    }, [selectedChat, handleFetch, setMessages]);

    React.useEffect(() => {
        const element = bottomRef.current;

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (loading) {
        return (
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader message="loading messages..." />
            </Container>
        );
    }

    if (error) {
        return (
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h6">Error</Typography>
                <Typography color="text.secondary" variant="subtitle1">
                    Failed to fetch messages.
                </Typography>
            </Container>
        );
    }

    return (
        <Container component="ul" sx={{ padding: 2 }}>
            {messages.map((msg) => (
                <MessageBubble component="li" key={msg.id} message={msg} />
            ))}
            <div ref={bottomRef}></div>
        </Container>
    );
}

export default MessagePanelContent;
