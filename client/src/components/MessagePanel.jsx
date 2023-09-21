import React from "react";
import { Grid, Paper, Divider } from "@mui/material";
import MessagePanelHeader from "./MessagePanelHeader.jsx";
import MessageTextCombo from "./MessageTextCombo.jsx";

const useSX = () => ({
    root: {
        height: "100%",
        borderRadius: 3,
        display: "flex"
    },
    gridContainer: {
        MinHeight: "100%"
    },
    messages: {
        flexGrow: 1
    }
});

function MessagePanel() {
    const styles = useSX();

    return (
        <Paper variant="outlined" sx={styles.root}>
            <Grid container direction="column" sx={styles.gridContainer} >
                <Grid item>
                    <MessagePanelHeader />
                </Grid>
                <Divider />
                <Grid item sx={styles.messages}>
                    <br/>
                </Grid>
                <Divider />
                <Grid item>
                    <MessageTextCombo />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MessagePanel;