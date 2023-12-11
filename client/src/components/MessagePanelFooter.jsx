import React from "react";
import EmojiPicker from "emoji-picker-react";
import { TextField, IconButton, Box, Popover, Stack } from "@mui/material";
import {
    EmojiEmotionsOutlined,
    PhotoCameraBackOutlined,
    SendOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js";
import useFileUpload from "../hooks/useFileUpload.js";
import useFetch from "../hooks/useFetch.js";
import ImagePreview from "./ImagePreview.jsx";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const useSX = () => ({
    textField: {
        minWidth: 200,
        "& input": {
            px: 2.5,
        },
        "& fieldset": {
            borderRadius: 5,
        },
    },
});

const MessageTextCombo = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        //If no "file" or "value" exists or the fetch is loading.
        //short circuit the function call.
        if ((!file && !value) || loading) {
            return;
        }

        try {
            const formData = new FormData();

            formData.append("content", value);
            formData.append("chatId", selectedChat);

            if (file) {
                formData.append("file", file);
            }

            const msg = await handleFetch("/api/v1/message", {
                method: "POST",
                body: formData,
            });

            emitNewMessageCreated(msg);
            updateLastMessage(msg);
            addMessage(msg);
            
            clearFileUpload();
            setValue("");
        } catch (err) {
            console.log(err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    const handleFileUploadClick = () => {
        inputRef.current.click();
    };

    const FilePreviewBox = (
        <Box sx={{ paddingBottom: 1 }}>
            <Stack direction="row" alignItems="center">
                <Box>
                    <ImagePreview height="80px" src={url} alt="file preview" />
                </Box>
                <Box>
                    <IconButton onClick={clearFileUpload}>
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );

    return (
        <Box component="form" padding={2} onSubmit={handleSubmit}>
            {file && FilePreviewBox}
            <Stack direction="row">
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

                <Stack direction="row">
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
                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        name="file"
                        onChange={handleFileChange}
                    />
                    <IconButton type="submit" color="primary">
                        <SendOutlined />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default MessageTextCombo;
