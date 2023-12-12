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
    const [isTyping, setIsTyping] = React.useState(false);

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

    React.useEffect(() => {
        if (isTyping) {
            emitUserTyping(selectedChat);
        }
    }, [emitUserTyping, isTyping, selectedChat]);

    React.useEffect(() => {
        let handler;

        if (isTyping) {
            handler = setTimeout(() => {
                setIsTyping(false);
                emitUserStopTyping(selectedChat);
            }, 2000);
        } else {
            clearTimeout(handler)
        }

        return () => {
            clearTimeout(handler);
        };
    }, [value, isTyping, emitUserStopTyping, selectedChat]);

    const styles = useSX();

    const handleClose = () => setAnchor(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //If no "file" or "value" exists or the fetch is loading, short circuit.
        if ((!file && !value) || loading) {
            return;
        }

        try {
            setIsTyping(false);
            emitUserStopTyping(selectedChat);

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

            clearFile();
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

    const handleChange = (e) => {
        setValue(e.target.value);
        setIsTyping(true);
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
                    <IconButton onClick={clearFile}>
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
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    inputProps={{ "aria-label": "message" }}
                    placeholder="Enter Message..."
                    multiline
                    maxRows={4}
                />

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
                    <IconButton type="submit" color="primary">
                        <SendOutlined />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default MessageTextCombo;
