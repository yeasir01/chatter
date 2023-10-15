import React from "react";
import EmojiPicker from "emoji-picker-react";
import { TextField, IconButton, Box, Popover } from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js";

const useSX = () => ({
    root: {
        display: "flex",
        gap: 1,
        p: 2,
    },
    textField: {
        "& input": {
            px: 2.5,
        },
        "& fieldset": {
            borderRadius: 5,
        },
    },
});

const MessageTextCombo = React.memo(() => {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");

    const currentChat = useStore((state) => state.currentChat);
    const sendMessage = useStore((state) => state.sendMessage);
    const userId = useStore((state) => state.id);

    const styles = useSX();

    const emojiIsOpen = Boolean(anchor);
    const emojiId = emojiIsOpen ? "simple-popover" : undefined;

    const handleClose = () => setAnchor(null);

    const handleEmojiClick = React.useCallback(
        (param) => {
            setValue(value + param.emoji);
            handleClose();
        },
        [value]
    );

    const handleSendMessage = React.useCallback(
        (e) => {
            e.preventDefault();
            sendMessage({
                id: window.crypto.randomUUID(),
                content: value,
                date: Date.now(),
                senderId: userId,
                chatId: currentChat,
            });
            setValue("");
        },
        [value, sendMessage, userId, currentChat]
    );

    return (
        <Box component="form" sx={styles.root} onSubmit={handleSendMessage}>
            <TextField
                fullWidth
                size="small"
                sx={styles.textField}
                value={value}
                onInput={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "message" }}
                placeholder="Enter Message..."
                autoComplete="off"
                multiline
                maxRows={4}
            />
            <IconButton
                aria-describedby={emojiId}
                onClick={(e) => setAnchor(e.currentTarget)}
            >
                <EmojiEmotionsOutlined />
            </IconButton>
            <Popover
                id={emojiId}
                open={emojiIsOpen}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
            </Popover>
            <IconButton>
                <PhotoCameraBackOutlined />
            </IconButton>
            <IconButton type="submit" color="primary">
                <SendOutlined />
            </IconButton>
        </Box>
    );
});

export default MessageTextCombo;
