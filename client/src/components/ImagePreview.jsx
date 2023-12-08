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
                        height: "auto",
                        width: "100%",
                        borderRadius: 12,
                    }}
                    loading="lazy"
                />
            </Box>

            <Dialog
                TransitionComponent={Grow}
                transitionDuration={{ enter: 600, exit: 100 }}
                open={open}
                onClose={handleClose}
                maxWidth="md"
            >
                <img
                    onClick={handleClose}
                    src={src}
                    alt="Preview"
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
            </Dialog>
        </>
    );
};

export default React.memo(ImagePreview);
