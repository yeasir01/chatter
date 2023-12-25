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
import { useDebouncedCallback } from "use-debounce";

const MessageTextCombo = () => {
    const [anchor, setAnchor] = React.useState(null);
    const [value, setValue] = React.useState("");
    const [typing, setTyping] = React.useState(false);

    const selectedChat = useStore((state) => state.selectedChat);
    const setChatsLastMessage = useStore((state) => state.setChatsLastMessage);
    const emitNewMessageCreated = useStore(
        (state) => state.emitNewMessageCreated
    );
    const addMessage = useStore((state) => state.addMessage);
    const emitUserTyping = useStore((state) => state.emitUserTyping);
    const emitUserStopTyping = useStore((state) => state.emitUserStopTyping);
    const setSnackbar = useStore((state) => state.setSnackbar);

    const textRef = React.useRef(null);
    const inputRef = React.useRef(null);

    const { handleFileChange, clearFile, file, url } = useFileUpload();
    const { handleFetch, loading } = useFetch();

    const handleClose = () => setAnchor(null);
    const notReady = !selectedChat || loading || (!file && !value);

    React.useEffect(() => {
        if (typing) {
            emitUserTyping(selectedChat);
        }
    }, [emitUserTyping, selectedChat, typing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (notReady) {
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
            setChatsLastMessage(msg);
            addMessage(msg);
            setValue("");
            clearFile();
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message,
                severity: "error",
            });
            console.error(err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    const debounceTyping = useDebouncedCallback(() => {
        setTyping(false);
        emitUserStopTyping(selectedChat)
    }, 4000);

    const handleChange = (e) => {
        setValue(e.target.value);
        setTyping(true);
        debounceTyping();
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
                            inputProps: {
                                id:"message-field"
                            },
                            sx: {
                                borderRadius: 3,
                                overflow: "hidden",
                                padding: "12px 24px",
                                minWidth: "200px",
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
                        <IconButton
                            type="submit"
                            color="primary"
                            disabled={notReady}
                        >
                            <SendOutlined />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default MessageTextCombo;
