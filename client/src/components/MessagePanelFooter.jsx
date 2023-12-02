import React from "react";
import EmojiPicker from "emoji-picker-react";
import { TextField, IconButton, Box, Popover } from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js";
import useFileUpload from "../hooks/useFileUpload.js";
import useFetch from "../hooks/useFetch.js";

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
        height: "100%",
    },
});

const MessageTextCombo = React.memo(() => {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");

    const selectedChat = useStore((state) => state.selectedChat);
    //const sendMessage = useStore((state) => state.sendMessage);
    const updateLastMessage = useStore((state) => state.updateLastMessage);
    const emitNewMessageCreated = useStore(
        (state) => state.emitNewMessageCreated
    );
    const addMessage = useStore((state) => state.addMessage);

    const textRef = React.useRef(null);
    const inputRef = React.useRef(null);

    const { handleFileChange, clearFileUpload, file, url } = useFileUpload();
    const { handleFetch, error, loading } = useFetch();

    const styles = useSX();

    const emojiIsOpen = Boolean(anchor);
    const emojiId = emojiIsOpen ? "simple-popover" : undefined;

    const handleClose = () => setAnchor(null);

    const handleEmoji = ({ emoji }) => {
        const cursorStart = textRef.current.selectionStart;
        const cursorEnd = textRef.current.selectionEnd;
        //places the emoji at the cursor's current location
        const newValue =
            value.slice(0, cursorStart) + emoji + value.slice(cursorEnd);

        setValue(newValue);
        handleClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("content", value);
        formData.append("chatId", selectedChat);

        if (file) {
            formData.append("file", file);
        }

        const fetchOptions = {
            method: "POST",
            body: formData,
        };

        handleFetch("/api/v1/message", fetchOptions)
            .then((msg) => {
                emitNewMessageCreated(msg);
                updateLastMessage(msg);
                addMessage(msg);
                setValue("");
                clearFileUpload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    const handleFileUploadClick = () => {
        inputRef.current.click();
    };

    return (
        <Box component="form" sx={styles.root} onSubmit={handleSubmit}>
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

            <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept="image/jpeg, image/png, image/gif, image/webp"
                name="file"
                onChange={handleFileChange}
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
                    <EmojiPicker onEmojiClick={handleEmoji} theme="light" />
                </Popover>
                <IconButton onClick={handleFileUploadClick}>
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
