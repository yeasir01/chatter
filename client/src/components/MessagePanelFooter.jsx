import React from "react";
import EmojiPicker from "emoji-picker-react";
import { TextField, IconButton, Box, Popover } from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js"

const useSX = () => ({
    root: {
        display: "flex",
        gap: 1,
        p: 2
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

function MessageTextCombo() {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");
    
    const userId = useStore(state => state.id)
    const sendMessage = useStore(state => state.sendMessage)
    const currentChat = useStore(state => state.currentChat)
    
    const styles = useSX();

    const emojiIsOpen = Boolean(anchor);
    const id = emojiIsOpen ? "simple-popover" : undefined;

    const handleClose = () => setAnchor(null);

    const handleEmojiClick = (param) => {
        setValue(prev=> prev + param.emoji)
        handleClose()
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage({
            id: window.crypto.randomUUID(),
            content: value,
            date: Date.now(),
            senderId: userId,
            chatId: currentChat
        })
        setValue("")
    }

    return (
        <Box component={"form"} sx={styles.root} onSubmit={handleSendMessage}>
            <TextField
                fullWidth
                size="small"
                sx={styles.textField}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "message" }}
                placeholder="Enter Message..."
                autoComplete="off"
                multiline
                maxRows={4}
            />
            <IconButton
                aria-describedby={id}
                onClick={(e) => setAnchor(e.currentTarget)}
            >
                <EmojiEmotionsOutlined />
            </IconButton>
            <Popover
                id={id}
                open={emojiIsOpen}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
            >
                <EmojiPicker onEmojiClick={handleEmojiClick} theme={"light"} />
            </Popover>
            <IconButton>
                <PhotoCameraBackOutlined />
            </IconButton>
            <IconButton type="submit" onClick={handleSendMessage} color="primary">
                <SendOutlined />
            </IconButton>
        </Box>
    );
}

export default MessageTextCombo;
