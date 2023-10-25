import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Typography,
    IconButton,
    AvatarGroup,
    Avatar,
} from "@mui/material";
import useStore from "../hooks/useStore.js"
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
        width: 35
    }
});

function MessagePanelHeader() {
    const styles = useSX();
    const chats = useStore((state)=>state.chats);
    const currentChatId = useStore((state)=>state.currentChat);

    const currentChat = chats.find((chat)=> chat.id === currentChatId);

    if(!currentChat) {
        return(<></>)
    }

    const isGroup = currentChat.group;
    const title = isGroup ? currentChat.name : getParticipantFullName(currentChat.participants[0]);

    console.log(currentChat)

    return (
        <Box sx={styles.root}>
            <Box sx={styles.title}>
                <AvatarGroup spacing="small" max={3}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://i.pravatar.cc/300?img=8"
                        sx={styles.avatar}
                    />
                    <Avatar
                        alt="Mike Tyson"
                        src="https://i.pravatar.cc/300?img=7"
                        sx={styles.avatar}
                    />
                    <Avatar
                        alt="Jessie James"
                        src="https://i.pravatar.cc/300?img=6"
                        sx={styles.avatar}
                    />
                </AvatarGroup>
                <Typography variant="h5">{title}</Typography>
            </Box>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </Box>
    );
}

export default MessagePanelHeader;
