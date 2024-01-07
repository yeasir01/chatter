import React from "react";
import { List, ListItem, Skeleton, Divider, Typography } from "@mui/material";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import sortCompareHelper from "../utils/sortCompareHelper.js";
import ChatsListItem from "./ChatsListItem.jsx";

export default function ChatsList() {
    const chats = useStore((state) => state.chats);
    const isConnected = useStore((state) => state.isConnected);
    const setChats = useStore((state) => state.setChats);
    const setSnackbar = useStore((state) => state.setSnackbar);
    const searchResults = useStore((state) => state.chatSearch.results);
    const searchTerm = useStore((state) => state.chatSearch.term);

    const { handleFetch, loading } = useFetch({
        initialLoadingState: true,
    });

    React.useEffect(() => {
        const fetchChats = async () => {
            try {
                const chats = await handleFetch("/api/v1/chat/chats");
                setChats(chats);
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: err.message,
                    severity: "error",
                });
                console.error(err);
            }
        };

        if (isConnected) {
            fetchChats();
        }
    }, [handleFetch, setChats, isConnected, setSnackbar]);

    const sortByLastMsgReceived = [...chats].sort((a, b) => {
        const firstRecord = a?.lastMessage?.createdAt || a.createdAt;
        const secondRecord = b?.lastMessage?.createdAt || b.createdAt;

        return sortCompareHelper(firstRecord, secondRecord);
    });

    const result = searchTerm ? searchResults : sortByLastMsgReceived;

    if (loading) {
        const array = new Array(10).fill(0);

        return (
            <List dense>
                {array.map((__, idx) => (
                    <ListItem key={idx}>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{ width: "100%", height: 62 }}
                        />
                    </ListItem>
                ))}
            </List>
        );
    }

    if (chats.length === 0) {
        return (
            <List>
                <ListItem sx={{justifyContent:"center", width: "100%"}}>
                    <Typography color="secondary" sx={{userSelect: "none"}}>
                        No chats to display.
                    </Typography>
                </ListItem>
            </List>
        );
    }

    if (result.length === 0) {
        return (
            <List>
                <ListItem sx={{justifyContent:"center", width: "100%"}}>
                    <Typography color="secondary" sx={{userSelect: "none"}}>
                        No match. Try another keyword.
                    </Typography>
                </ListItem>
            </List>
        );
    }

    return (
        <List dense disablePadding>
            {result.map((chat) => (
                <React.Fragment key={chat.id}>
                    <ChatsListItem chat={chat} />
                    <Divider variant="inset" />
                </React.Fragment>
            ))}
        </List>
    );
}
