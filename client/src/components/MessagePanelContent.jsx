import React from "react";
import { Box, List } from "@mui/material";
import MessageBubble from "./MessageBubble";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import Loader from "./Loader.jsx";
import OfflineErrorMessage from "./OfflineErrorMessage.jsx";
import FlexCenterContainer from "../layout/flexCenterContainer.jsx";
import { TransitionGroup } from "react-transition-group";

function MessagePanelContent() {
    const messages = useStore((state) => state.messages);
    const setMessages = useStore((state) => state.setMessages);
    const selectedChat = useStore((state) => state.selectedChat);
    const isConnected = useStore((state) => state.isConnected);

    const boxRef = React.useRef(null);

    const { handleFetch, error, loading } = useFetch();

    React.useLayoutEffect(() => {
        const element = boxRef.current;

        if (element) {
            element.scrollIntoView({behavior: "instant", block: "end"})
        };
        
    }, [loading]);

    React.useEffect(() => {
        const element = boxRef.current;

        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

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
                <Box ref={boxRef}></Box>
            </List>
        </>
    );
}

export default MessagePanelContent;
