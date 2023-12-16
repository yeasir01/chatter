import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, ListItemText } from "@mui/material";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";
import AvatarWithBadge from "./AvatarWithBadge.jsx";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const useSX = () => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {
            xs: 1,
            sm: 2,
        },
    },
    title: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    onlineText: {
        display: {
            xs: "none",
            sm: "block",
        },
    },
});

function MessagePanelHeader() {
    const styles = useSX();
    const chat = useStore((state) => state.getCurrentChatProfile());
    const profiles = useStore((state) => state.profiles);
    const setSelectedChat = useStore((state) => state.setSelectedChat);
    const setUiState = useStore((state) => state.setUiState);

    if (!chat) return <></>;
    
    const participant = profiles[chat.participants[0]];

    const getListOfParticipantsNames = (participants) => {
        const array = participants.map((id) => {
            return profiles[id].firstName;
        });

        return `${array.join(", ")}, You`;
    };

    const handleClearSelectedChat = () => {
        setSelectedChat(null);
        setUiState("chats");
    };

    const group = chat.group;
    const title = group ? chat.name : getParticipantFullName(participant);
    const caption = group
        ? getListOfParticipantsNames(chat.participants)
        : participant.online
        ? "Online"
        : "Offline";
    const image = group ? chat.picture : participant.picture;
    const isOnline = group ? false : participant.online;

    return (
        <Box sx={styles.root}>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton color="primary" onClick={handleClearSelectedChat}>
                    <ArrowBackIosNewOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={styles.title}>
                <AvatarWithBadge alt={title} src={image} online={isOnline} />
                <ListItemText
                    primary={title}
                    secondary={caption}
                />
            </Box>
            <Box>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default MessagePanelHeader;
