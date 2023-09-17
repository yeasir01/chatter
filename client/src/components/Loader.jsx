import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import Logo from "./Logo";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        fontSize: "3em",
    },
    progress: {
        width: 300,
        textAlign: "center",
    },
    text: {
        paddingY: 2,
    },
};

function Loader({message="Loading..."}) {
    return (
        <Box component="div" sx={styles.root}>
            <Logo sx={styles.logo} />
            <Box sx={styles.progress}>
                <LinearProgress/>
                <Typography sx={styles.text}>{message}</Typography>
            </Box>
        </Box>
    );
}

export default Loader;
