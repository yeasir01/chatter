import React from "react";
import { InputBase, OutlinedInput, Badge, Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomBadge = styled("div")(({ theme, children }) => ({
    position: "relative",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: " #ff4500",
    color: "white",
    fontWeight: "bold",
    overflow: "hidden",

    "&:after": {
        content: `"${children}"`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        lineHeight: "1",
    },
}));

function Test({ count = 100 }) {
    const display = count > 99 ? "99+" : count.toString();

    return (
        <>
            <Chip label={display} size="small" />
        </>
    );
}

export default Test;
