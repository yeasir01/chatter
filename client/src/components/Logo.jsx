import React from "react";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { Box, Typography } from "@mui/material";

const useSX = (color)=>({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: color || "text.primary",
        fontSize: "1.5rem", 
    }
});

function Logo({ sx, color, ...rest }) {

    const styles = useSX(color);

    return (
        <Box sx={[styles.root, sx]} {...rest}>
            <BubbleChartOutlinedIcon fontSize="inherit" color={color || "primary"}/>
            <Typography fontSize="inherit">Chatter</Typography>
        </Box>
    );
}

export default Logo;
