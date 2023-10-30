import React from "react";
import EmojiPicker from "emoji-picker-react";
import {
    TextField,
    IconButton,
    Box,
    Popover,
} from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js";

const useSX = () => ({
    root: {
        display: "flex",
        alignItems: "center",
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
    buttonGroup: {
        display: "flex",
        flexWrap: "no-wrap",
        height: "100%"
    }
});

const MessageTextCombo = React.memo(() => {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");

    const textRef = React.useRef(null);

    const currentChat = useStore((state) => state.currentChat);
    const sendMessage = useStore((state) => state.sendMessage);
    const userId = useStore((state) => state.user.id);

    const styles = useSX();

    const emojiIsOpen = Boolean(anchor);
    const emojiId = emojiIsOpen ? "simple-popover" : undefined;

    const handleClose = () => setAnchor(null);

    //Places the emoji where the cursor is
    const handleEmojiClick = ({ emoji }) => {
        const cursorStart = textRef.current.selectionStart;
        const cursorEnd = textRef.current.selectionEnd;
        const newValue = value.slice(0, cursorStart) + emoji + value.slice(cursorEnd);

        setValue(newValue);
        handleClose();
    };

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

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage(e);
        }
    };

    return (
        <Box component="form" sx={styles.root} onSubmit={handleSendMessage}>
            <TextField
                inputRef={textRef}
                spellCheck
                autoComplete="off"
                lang="en"
                fullWidth
                size="small"
                sx={styles.textField}
                value={value}
                onInput={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyPress}
                inputProps={{ "aria-label": "message" }}
                placeholder="Enter Message..."
                multiline
                maxRows={4}
            />
            <Box sx={styles.buttonGroup}>
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
        </Box>
    );
});

export default MessageTextCombo;
