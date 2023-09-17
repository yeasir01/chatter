import React from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright() {
    return (
        <Typography component="span" variant="body2" color="text.secondary">
            {`Copyright © `}
            <MuiLink color="inherit" component={Link} to="/">
                Chatter
            </MuiLink>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}

export default Copyright;
