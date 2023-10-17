import React from "react";
import {
    ListItemAvatar,
    ListItemButton,
    Avatar,
    ListItemText,
    Typography,
    Box
} from "@mui/material";
import colorGenerator from "../utils/colorGenerator.js";

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
        width: "150px"
    },
    button: {
        width: "95%",
        borderRadius: 3,
        mb: 0.5
    }
});

function ChatListItem(props) {
    const { name, src, msg, time } = props;
    const styles = useSX();

    return (
        <ListItemButton sx={styles.button} {...props}>
            <ListItemAvatar>
                <Avatar {...colorGenerator(name)} alt={name} src={src} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box sx={styles.title}>
                        <Typography component="span" variant="p" noWrap sx={styles.primaryText}>
                            {name}
                        </Typography>
                        <Typography component="span" variant="caption" noWrap>
                            {time}
                        </Typography>
                    </Box>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary" sx={styles.content} >
                        {msg}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

export default ChatListItem;
