import React from "react";
import {
    List,
    ListItem,
    Skeleton,
} from "@mui/material";
import ChatsListItem from "./ChatsListItem";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import OfflineErrorMessage from "./OfflineErrorMessage.jsx";

// compare helper function for sorting.
const compare = function (a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
};

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

        return compare(firstRecord, secondRecord);
    });

    if (loading) {
        const array = new Array(10).fill("");

        return (
            <List dense>
                {array.map((__, idx) => (
                    <ListItem key={idx}>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{ width: "100%", height: 60 }}
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
        <List dense>
            {sortedByLastMsgTime.map((chat) => (
                <ChatsListItem chat={chat} key={chat.id} />
            ))}
        </List>
    );
}
