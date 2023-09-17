import React from "react";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { Box, Typography } from "@mui/material";

function Logo({ sx, ...rest }) {
    const styles = {
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: "text.primary",
        fontSize: "1.5rem",
        ...sx,
    };

    return (
        <Box sx={styles} {...rest}>
            <BubbleChartOutlinedIcon fontSize="inherit" color="primary"/>
            <Typography fontSize="inherit">Chatter</Typography>
        </Box>
    );
}

export default Logo;
