import React from "react";
import { Box, List, ListItem } from "@mui/material";
import MessageBubble from "./MessageBubble";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import Loader from "./Loader.jsx";
import OfflineErrorMessage from "./OfflineErrorMessage.jsx";
import { FlexCenterContainer } from "../layout/layout.jsx"
import { TransitionGroup } from "react-transition-group";
import TypingBubble from "./TypingBubble.jsx";

function MessagePanelContent() {
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const selectedChat = useStore((state) => state.selectedChat);
    const isConnected = useStore((state) => state.isConnected);
    const typing = useStore((state) => state.typing);

    const boxRef = React.useRef(null);

    const { handleFetch, error, loading } = useFetch();

    const userTyping = typing[selectedChat];

    React.useLayoutEffect(() => {
        const element = boxRef.current;

        if (element) {
            element.scrollIntoView({ behavior: "instant", block: "end" });
        }
    }, [loading]);

    React.useEffect(() => {
        const element = boxRef.current;

        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, userTyping]);

    React.useEffect(() => {
        const fetchMessages = async (chatId) => {
            try {
                const res = await handleFetch(`/api/v1/message/chat/${chatId}`);
                setMessages(res);
            } catch (err) {
                console.log(err);
            }
        };

        if (selectedChat && isConnected) {
            fetchMessages(selectedChat);
        }
    }, [selectedChat, handleFetch, setMessages, isConnected]);

    if (loading) {
        return (
            <FlexCenterContainer>
                <Loader message="loading messages..." />
            </FlexCenterContainer>
        );
    }

    if (error) {
        return <OfflineErrorMessage />;
    }

    return (
        <>
            <List>
                <TransitionGroup>
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                </TransitionGroup>
                <ListItem>
                    {userTyping && <TypingBubble userId={userTyping} />}
                </ListItem>
                <ListItem>
                    <Box ref={boxRef}></Box>
                </ListItem>
            </List>
        </>
    );
}

export default MessagePanelContent;
