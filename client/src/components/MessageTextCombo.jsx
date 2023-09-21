import React from "react";
import EmojiPicker from "emoji-picker-react";
import { TextField, IconButton, Box, Popover } from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";

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
    
    const styles = useSX();

    const emojiIsOpen = Boolean(anchor);
    const id = emojiIsOpen ? "simple-popover" : undefined;

    const handleClose = () => setAnchor(null);

    const handleEmojiClick = (param) => {
        setValue(prev=> prev + param.emoji)
        handleClose()
    }

    return (
        <Box sx={styles.root}>
            <TextField
                fullWidth
                size="small"
                sx={styles.textField}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "message" }}
                placeholder="Enter Message..."
                autoComplete="off"
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
            <IconButton color="primary">
                <SendOutlined />
            </IconButton>
        </Box>
    );
}

export default MessageTextCombo;
