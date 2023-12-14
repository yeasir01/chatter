import React from "react";
import {
    List,
    ListItem,
    Skeleton,
    Divider
} from "@mui/material";
//import ChatsListItem from "./ChatsListItem";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import OfflineErrorMessage from "./OfflineErrorMessage.jsx";
import sortCompareHelper from "../utils/sortCompareHelper.js";
import ChatsListItem from "./ChatsListItem.jsx";

export default function ChatsList({ filteredList }) {
    const chats = useStore((state) => state.chats);
    const isConnected = useStore((state) => state.isConnected);
    const setChats = useStore((state) => state.setChats);

    const { handleFetch, loading, error } = useFetch({initialLoadingState:true});

    /*     const display = filteredList.searchTerm
        ? filteredList.searchResults
        : sortedByLastMsgTime; */

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

    const sortedByLastMsgTime = [...chats].sort((a, b) => {
        const firstRecord = a?.lastMessage?.createdAt || a.createdAt;
        const secondRecord = b?.lastMessage?.createdAt || b.createdAt;

        return sortCompareHelper(firstRecord, secondRecord);
    });

    if (loading ) {
        const array = new Array(10).fill("");

        return (
            <List dense>
                {array.map((__, idx) => (
                    <ListItem key={idx}>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{ width: "100%", height: 77 }}
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
            {sortedByLastMsgTime.map((chat) => (
                <React.Fragment key={chat.id}>
                    <ChatsListItem chat={chat}/>
                    <Divider variant="inset" component="li" />    
                </React.Fragment>
            ))}
        </List>
    );
}