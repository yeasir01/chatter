import React, { useState } from "react";
import { Dialog, Box, Grow, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const ImagePreview = (props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {loading && (
                <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={props.height}
                    height={props.height}
                />
            )}

            <Box
                component={"img"}
                loading="lazy"
                onClick={handleOpen}
                src={props.src}
                alt={props.alt}
                sx={{
                    cursor: "zoom-in",
                    marginTop: 1,
                    objectFit: "scale-down",
                    maxHeight: props.height,
                    width: "auto",
                    borderRadius: 3,
                }}
                onLoad={() => setLoading(false)}
            />

            <Dialog
                TransitionComponent={Grow}
                transitionDuration={{ enter: 600, exit: 100 }}
                open={open}
                onClose={handleClose}
                maxWidth="md"
            >
                <Box
                    component={"img"}
                    onClick={handleClose}
                    src={props.src}
                    alt="Preview"
                    sx={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                    }}
                />
            </Dialog>
        </>
    );
};

ImagePreview.defaultProps = {
    src: "",
    alt: "",
    height: "200px",
    width: "auto",
};

ImagePreview.prototype = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(ImagePreview);