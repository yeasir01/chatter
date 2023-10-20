import React from "react";
import { List } from "@mui/material";
import ChatsListItem from "./ChatsListItem";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";

export default function ChatsList({ filteredList, chats }) {
    const setChats = useStore((state) => state.setChats);
    const { response, isLoading } = useFetch("/api/v1/chat/chats");

    const display = filteredList.searchTerm
        ? filteredList.searchResults
        : chats;

    React.useEffect(() => {
        if (response) {
            setChats(response);
        }
    }, [response, setChats]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <List dense>
            {display.map((chat) => (
                <ChatsListItem data={chat} key={chat.id} />
            ))}
        </List>
    );
}
