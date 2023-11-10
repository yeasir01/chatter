import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Avatar,
    Typography,
    Box,
    Stack,
    Badge,
} from "@mui/material";
import formatDateTime from "../utils/dateFormat.js";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";
import { styled } from "@mui/material/styles";

const useSX = () => ({
    content: {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    button: {
        borderRadius: 3,
        padding: 1.5,
    },
    badge: {
        display: "flex",
        alignItems: "center",
        padding: 1.1,
    },
});

const Item = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}));

function ChatListItem({ chat }) {
    const styles = useSX();
    const currentChat = useStore((state) => state.currentChat);
    const setCurrentChat = useStore((state) => state.setCurrentChat);
    const participant = useStore((state) => state.getFirstParticipant(chat));
    const notification = useStore((state) => state.notification);

    const isGroup = chat.group;
    const isSelected = currentChat === chat.id;
    const notificationCount = notification[chat.id];

    const title = isGroup ? chat.name : getParticipantFullName(participant);
    const picture = isGroup ? chat.picture : participant.picture;
    const date = chat.lastMessage
        ? formatDateTime(chat.lastMessage.updatedAt)
        : formatDateTime(chat.updatedAt);
    const content = chat.lastMessage?.content || "No message to display.";

    return (
        <>
            <ListItem>
                <ListItemButton sx={styles.button} selected={isSelected} onClick={() => setCurrentChat(chat.id)} >
                    <ListItemAvatar>
                        <Avatar alt={title} src={picture}/>
                    </ListItemAvatar>
                    <Stack sx={{width: "100%"}}>
                        <Item>
                            <Typography noWrap sx={{maxWidth: "170px"}}>{title}</Typography>
                            <Typography variant="caption">{date}</Typography>
                        </Item>
                        <Item>
                            <Typography sx={styles.content} variant="body2" color="text.secondary">{content}</Typography>
                            <Box sx={styles.badge}>
                                <Badge 
                                    color="primary" 
                                    badgeContent={notificationCount} 
                                    overlap="circular"
                                    component="div"
                                />
                            </Box>
                        </Item>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default ChatListItem;
