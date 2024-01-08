import React from "react";
import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright() {
    return (
        <Box sx={{padding: 2, textAlign: "center"}}>
            <Typography component="span" variant="body2" color="text.secondary">
                {`Copyright © `}
                <MuiLink color="inherit" component={Link} to="/">
                    Chatter
                </MuiLink>
                {` ${new Date().getFullYear()}.`}
            </Typography>
        </Box>
    );
}

export default Copyright;
