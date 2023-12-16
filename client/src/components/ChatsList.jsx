import React from "react";
import {
    List,
    ListItem,
    Skeleton,
    Divider
} from "@mui/material";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import OfflineErrorMessage from "./OfflineErrorMessage.jsx";
import sortCompareHelper from "../utils/sortCompareHelper.js";
import ChatsListItem from "./ChatsListItem.jsx";

export default function ChatsList() {
    const chats = useStore((state) => state.chats);
    const isConnected = useStore((state) => state.isConnected);
    const setChats = useStore((state) => state.setChats);
    const searchResults = useStore((state)=>state.chatSearch.results);
    const searchTerm = useStore((state)=>state.chatSearch.term);

    const { handleFetch, loading, error } = useFetch({initialLoadingState:true});

    React.useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await handleFetch("/api/v1/chat/chats");
                setChats(res);
            } catch (err) {
                console.log(err);
            }
        };

        if (isConnected) {
            fetchChats();
        }
    }, [handleFetch, setChats, isConnected]);

    const sortByLastMsgTime = [...chats].sort((a, b) => {
        const firstRecord = a?.lastMessage?.createdAt || a.createdAt;
        const secondRecord = b?.lastMessage?.createdAt || b.createdAt;

        return sortCompareHelper(firstRecord, secondRecord);
    });

    const records = searchTerm ? searchResults : sortByLastMsgTime;

    if (loading ) {
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

    if (error) {
        return <OfflineErrorMessage/>
    };

    return (
        <List dense disablePadding>
            {records.map((chat) => (
                <React.Fragment key={chat.id}>
                    <ChatsListItem chat={chat}/>
                    <Divider variant="inset" component="li" />    
                </React.Fragment>
            ))}
        </List>
    );
}