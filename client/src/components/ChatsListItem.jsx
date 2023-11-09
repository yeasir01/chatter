import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Avatar,
    ListItemText,
    Typography,
    Box,
} from "@mui/material";
import formatDateTime from "../utils/dateFormat.js";
import useStore from "../hooks/useStore.js"
import getParticipantFullName from "../utils/nameFormat.js"

const useSX = () => ({
    content: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    primaryText: {
        width: "150px",
    },
    button: {
        width: "100%",
        borderRadius: 3,
    },
});

function ChatListItem({ chat }) {
    const styles = useSX();
    const currentChat = useStore((state)=> state.currentChat);
    const setCurrentChat = useStore((state)=> state.setCurrentChat);
    const participant = useStore((state)=>state.getFirstParticipant(chat));

    const isGroup = chat.group;
    const isSelected = currentChat === chat.id;

    const title = isGroup ? chat.name : getParticipantFullName(participant);
    const picture = isGroup ? chat.picture : participant.picture;
    const date = chat.lastMessage ? formatDateTime(chat.lastMessage.updatedAt) : formatDateTime(chat.updatedAt);
    const content = chat.lastMessage?.content || "No message to display.";

    return (
        <>
            <ListItem>
                <ListItemButton 
                    sx={styles.button} 
                    selected={isSelected} 
                    onClick={()=> setCurrentChat(chat.id)}
                    >
                    <ListItemAvatar>
                        <Avatar alt={title} src={picture} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Box sx={styles.title}>
                                <Typography
                                    component="span"
                                    variant="p"
                                    noWrap
                                    sx={styles.primaryText}
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="caption"
                                    noWrap
                                >
                                    {date}
                                </Typography>
                            </Box>
                        }
                        secondary={
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={styles.content}
                            >
                                {content}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default ChatListItem;
