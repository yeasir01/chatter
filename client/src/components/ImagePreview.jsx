import React, { useState } from "react";
import { Dialog, Box, Grow } from "@mui/material";

const ImagePreview = ({ src, alt }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box onClick={handleOpen} sx={{ cursor: "zoom-in", mt: 1 }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        objectFit: "contain",
                        height: "100%",
                        width: "100%",
                        borderRadius: 12
                    }}
                />
            </Box>

            <Dialog
                TransitionComponent={Grow}
                transitionDuration={{ enter: 500, exit: 100 }}
                open={open}
                onClose={handleClose}
                maxWidth="md"
            >
                <img
                    onClick={handleClose}
                    src={src}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                />
            </Dialog>
        </>
    );
};

export default ImagePreview;
