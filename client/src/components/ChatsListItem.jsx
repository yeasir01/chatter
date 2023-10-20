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

function ChatListItem({ data }) {
    const styles = useSX();

    const isGroup = data.group;

    const title = isGroup ? data.name : `${data.participants[0].firstName} ${data.participants[0].lastName}`;
    const picture = isGroup ? data.picture : data.participants[0].picture;
    const date = data.lastMessage ? formatDateTime(data.lastMessage.createdAt) : formatDateTime(data.createdAt);
    const content = data.lastMessage?.content || "No message to display.";

    return (
        <ListItem>
            <ListItemButton sx={styles.button}>
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
    );
}

export default ChatListItem;
