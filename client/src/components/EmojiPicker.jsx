import React from "react";
import { Popover } from "@mui/material";
import ReactEmojiPicker from "emoji-picker-react";

const EmojiPicker = (props) => {
    const isOpen = Boolean(props.anchor);

    const handleEmojiSelection = ({ emoji }) => {
        const cursorStart = props.txtRef.current.selectionStart;
        const cursorEnd = props.txtRef.current.selectionEnd;
        const before = props.value.slice(0, cursorStart);
        const after = props.value.slice(cursorEnd);
        
        //places the emoji at the cursor location
        const newValue = before + emoji + after;

        props.setValue(newValue);
        props.handleClose();
    };

    return (
        <Popover
            id="emoji-picker"
            open={isOpen}
            anchorEl={props.anchor}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <ReactEmojiPicker
                onEmojiClick={handleEmojiSelection}
                theme="light"
            />
        </Popover>
    );
};

export default EmojiPicker;
