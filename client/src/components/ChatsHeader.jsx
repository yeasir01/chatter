import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchTextField from "./SearchTextField.jsx";
import useStore from "../hooks/useStore.js";
import debounce from "@mui/material";

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
    const setModal = useStore((state) => state.setModal);
    const userId = useStore((state) => state.userId);
    const chats = useStore((state) => state.chats);
    const profiles = useStore((state) => state.profiles);
    const searchTerm = useStore((state) => state.chatSearch.term);
    const setChatTerm = useStore((state) => state.setChatTerm);
    const setChatResults = useStore((state) => state.setChatResults);

    const handleSearch = (e) => {
        const input = e.target.value;
        const keyword = input.toLowerCase();

        if (keyword === "") {
            setChatTerm("");
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
            setChatTerm(input);
            setChatResults(results);
        }
    };

    const handleClearSearch = () => {
        setChatTerm("");
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