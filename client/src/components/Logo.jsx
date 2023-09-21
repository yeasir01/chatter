import React from "react";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import { Box, Typography } from "@mui/material";

const useSX = ()=>({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: "text.primary",
        fontSize: "1.5rem", 
    }
});

function Logo({ sx, ...rest }) {

    const styles = useSX();

    return (
        <Box sx={[styles.root, sx]} {...rest}>
            <BubbleChartOutlinedIcon fontSize="inherit" color="primary"/>
            <Typography fontSize="inherit">Chatter</Typography>
        </Box>
    );
}

export default Logo;
