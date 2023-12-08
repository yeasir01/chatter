import React from "react";
import { List, ListItem, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatsListItem from "./ChatsListItem";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
    width: "100%",
    height: 60,
}));

// compare helper function for sorting.
const compare = function (a, b) {
    return (a < b) ? 1 : ( (a > b) ? -1 : 0 );
}

export default function ChatsList({ filteredList }) {
    const chats = useStore((state) => state.chats);
    const setChats = useStore((state) => state.setChats);
    
    const { handleFetch, loading, error } = useFetch();

    const sortedByLastMsgTime = [...chats].sort((a, b)=> {
        return compare(a.lastMessage.createdAt, b.lastMessage.createdAt)
    })

    const display = filteredList.searchTerm
        ? filteredList.searchResults
        : sortedByLastMsgTime;

    React.useEffect(() => {
        handleFetch("/api/v1/chat/chats")
            .then((res) => {
                setChats(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [handleFetch, setChats]);

    if (loading) {
        const array = new Array(10).fill("");

        return (
            <List dense>
                {array.map((__, idx) => (
                    <ListItem key={idx}>
                        <StyledSkeleton variant="rounded" animation="wave" />
                    </ListItem>
                ))}
            </List>
        );
    }

    return (
        <List dense>
            {display.map((chat) => (
                <ChatsListItem chat={chat} key={chat.id} />
            ))}
        </List>
    );
}
