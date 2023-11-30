import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    Typography,
    IconButton,
    Avatar,
} from "@mui/material";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";

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
        height: 35,
        width: 35,
    },
});

function MessagePanelHeader() {
    const styles = useSX();
    const chat = useStore((state) => state.getCurrentChatProfile());
    const participant = useStore((state) => state.getParticipant(chat));
    
    if (!chat) {
        return <div>No Chat Selected!</div>;
    }
    
    const group = chat.group;
    const title = group ? chat.name : getParticipantFullName(participant);
    const image = group ? chat.picture : participant.picture;

    return (
        <Box sx={styles.root}>
            <Box sx={styles.title}>
                <Avatar alt={title} src={image} sx={styles.avatar} />
                <Typography variant="h6">{title}</Typography>
            </Box>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </Box>
    );
}

export default MessagePanelHeader;
