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
    const getFirstParticipant = useStore((state) => state.getFirstParticipant);
    const currentChat = useStore((state) => state.getCurrentChat());

    if (!currentChat) {
        return <div></div>;
    }

    const isGroup = currentChat.group
    const participant = getFirstParticipant(currentChat);
    const title = isGroup ? currentChat.name : getParticipantFullName(participant);
    const image = isGroup ? currentChat.picture : participant.picture;

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
