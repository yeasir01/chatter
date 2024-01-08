import React from "react";
import { Typography, Link, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function FooterAttribution() {
    return (
        <Box sx={{ padding: 2, textAlign: "center", fontSize: "0.5rem" }}>
            <Typography component="span" color="text.secondary">
                {"Crafted with "}
                <FavoriteBorderIcon color="error" fontSize="inherit" sx={{pt: "2px"}} />
                {" In California by "}
            <Link
                color="primary"
                href="https://yeasirhugais.com"
                target="_blank"
                rel="noreferrer"
                fontSize="inherit"
                sx={{textDecoration: "none"}}
            >
                Yeasir H.
            </Link>
            </Typography>
        </Box>
    );
}

export default FooterAttribution;
