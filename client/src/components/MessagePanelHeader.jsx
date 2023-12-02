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

const useSX = () => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
    },
    title: {
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    avatar: {
        height: 50,
        width: 50,
    },
});

function MessagePanelHeader() {
    const styles = useSX();
    const chat = useStore((state) => state.getCurrentChatProfile());
    const participant = useStore((state) => state.getParticipant(chat));
    
    if (!chat) {
        return <></>;
    }
    
    const group = chat.group;
    const title = group ? chat.name : getParticipantFullName(participant);
    const image = group ? chat.picture : participant.picture;
    const isOnline = group ? false : participant.online;
    
    return (
        <Box sx={styles.root}>
            <Box sx={styles.title}>
                <AvatarWithBadge alt={title} src={image} online={isOnline} size={50} />
                <ListItemText 
                    primary={title} 
                    secondary={(!group && participant.online) ? "Online" : "Offline"}
                />
            </Box>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </Box>
    );
}

export default MessagePanelHeader;
