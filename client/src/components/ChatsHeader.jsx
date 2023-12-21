import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchTextField from "./SearchTextField.jsx";
import useStore from "../hooks/useStore.js";

const useSX = () => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
    },
    search: {
        paddingX: 2,
        paddingBottom: 2,
    },
});

function ChatsHeader() {
    const styles = useSX();
    const userId = useStore((state) => state.user.id);
    const setModal = useStore((state) => state.setModal);
    const chats = useStore((state) => state.chats);
    const profiles = useStore((state) => state.profiles);
    const searchTerm = useStore((state) => state.chatSearch.term);
    const setSearchTerm = useStore((state) => state.setSearchTerm);
    const setChatResults = useStore((state) => state.setChatResults);

    const handleSearch = (e) => {
        const input = e.target.value;
        const keyword = input.toLowerCase();

        if (keyword === "") {
            setSearchTerm("");
            setChatResults([]);
        } else {
            const results = chats.filter((chat) => {
                const chatName = chat.name.toLowerCase();
                const isGroup = chat.group;

                if (isGroup && chatName.includes(keyword)) {
                    return true; // Match for group names
                }

                if (!isGroup) {
                    const match = chat.participants.some((id) => {
                        if (id === userId) {return false}; //skip ids that belong to logged in user.
                        const user = profiles[id];
                        const fullName = `${user.firstName} ${user.lastName}`;
                        return fullName.toLowerCase().includes(keyword);
                    });

                    if (match) {
                        return true; // Match for participant names
                    }
                }

                return false;
            });
            setSearchTerm(input);
            setChatResults(results);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setChatResults([]);
    };

    return (
        <>
            <Box sx={styles.header}>
                <AvatarWithMenu />
                <Typography fontWeight={600} paddingRight={2} variant="h4">
                    Chats
                </Typography>
                <IconButton onClick={() => setModal("create-chat")}>
                    <AddOutlinedIcon color="primary" />
                </IconButton>
            </Box>
            <Box sx={styles.search}>
                <SearchTextField
                    onChange={handleSearch}
                    value={searchTerm}
                    onClear={handleClearSearch}
                    name="conversation-search"
                    placeholder="Search..."
                    autoComplete='off'
                />
            </Box>
        </>
    );
}

export default ChatsHeader;
