import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    IconButton,
    ListItemText
} from "@mui/material";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";
import AvatarWithBadge from "./AvatarWithBadge.jsx";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const useSX = () => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
    },
    title: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    }
});

function MessagePanelHeader() {
    const styles = useSX();
    const chat = useStore((state) => state.getCurrentChatProfile());
    const participant = useStore((state) => state.getParticipant(chat));
    const setSelectedChat = useStore((state) => state.setSelectedChat);
    const setUiState = useStore((state) => state.setUiState);
    
    if (!chat) {
        return <></>;
    }
    
    const group = chat.group;
    const title = group ? chat.name : getParticipantFullName(participant);
    const image = group ? chat.picture : participant.picture;
    const isOnline = group ? false : participant.online;

    const handleClearSelectedChat = ()=> {
        setSelectedChat(null);
        setUiState("chats")
    }
    
    return (
        <Box sx={styles.root}>
            <Box sx={{display: {xs: "block", sm: "none"}}}>
                <IconButton onClick={handleClearSelectedChat}>
                    <ArrowBackIosNewOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={styles.title}>
                <AvatarWithBadge alt={title} src={image} online={isOnline} size={50} />
                <ListItemText 
                    primary={title} 
                    secondary={(!group && participant.online) ? "Online" : "Offline"}
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
