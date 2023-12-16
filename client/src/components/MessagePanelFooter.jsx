import React from "react";
import { TextField, IconButton, Box, Stack } from "@mui/material";
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
import EmojiPicker from "./EmojiPicker.jsx";

const MessageTextCombo = () => {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");

    const selectedChat = useStore((state) => state.selectedChat);
    const updateLastMessage = useStore((state) => state.updateLastMessage);
    const emitNewMessageCreated = useStore(
        (state) => state.emitNewMessageCreated
    );
    const addMessage = useStore((state) => state.addMessage);
    const emitUserTyping = useStore((state) => state.emitUserTyping);
    const emitUserStopTyping = useStore((state) => state.emitUserStopTyping);

    const textRef = React.useRef(null);
    const inputRef = React.useRef(null);

    const { handleFileChange, clearFile, file, url } = useFileUpload();
    const { handleFetch, error, loading } = useFetch();

    const handleClose = () => setAnchor(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedChat) {
            // Error msg here
            return;
        }

        if (loading || (!file && !value)) {
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

            emitUserStopTyping(selectedChat);
            emitNewMessageCreated(msg);
            updateLastMessage(msg);
            addMessage(msg);
            setValue("");
            clearFile();
        } catch (err) {
            console.log(err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        emitUserTyping(selectedChat);
    };

    const handleFileUploadClick = () => {
        inputRef.current.click();
    };

    const FilePreviewBox = (
        <Box sx={{ paddingBottom: 1 }}>
            <Stack gap={0.5} direction="row" alignItems="center">
                <Box>
                    <ImagePreview height="80px" src={url} alt="file preview" />
                </Box>
                <Box>
                    <IconButton size="small" onClick={clearFile}>
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );

    return (
        <Box component="form" padding={2} onSubmit={handleSubmit}>
            {file && FilePreviewBox}
            <Stack direction="row" gap={1} alignItems="center">
                <Box flexGrow={1}>
                    <TextField
                        inputRef={textRef}
                        spellCheck={true}
                        autoComplete="off"
                        lang="en"
                        fullWidth
                        size="small"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            "aria-label": "message",
                            sx: {
                                borderRadius: 3,
                                overflow: "hidden",
                                padding: "12px 32px",
                                minWidth: "180px",
                            },
                        }}
                        placeholder="Type a message..."
                        multiline
                        maxRows={4}
                    />
                </Box>
                <Box>
                    <Stack direction="row">
                        <IconButton
                            aria-describedby="emoji-picker"
                            onClick={(e) => setAnchor(e.currentTarget)}
                        >
                            <EmojiEmotionsOutlined />
                        </IconButton>
                        <EmojiPicker
                            handleClose={handleClose}
                            value={value}
                            setValue={setValue}
                            anchor={anchor}
                            txtRef={textRef}
                        />
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
                        <IconButton type="submit" color="primary" disabled={!Boolean(value)}>
                            <SendOutlined />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default MessageTextCombo;
