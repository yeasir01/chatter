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

    return (
        <Box sx={styles.root}>
            <Box sx={styles.title}>
                <AvatarGroup spacing="small" max={3}>
                    {currentChat.participants.map((person)=>{
                        return (
                            <Avatar
                                alt={getParticipantFullName(person)}
                                src={person.picture}
                                sx={styles.avatar}
                                key={person.id}
                            />
                        )
                    })}
                </AvatarGroup>
                <Typography variant="h6">{title}</Typography>
            </Box>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </Box>
    );
}

export default MessagePanelHeader;
