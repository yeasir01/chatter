import React from "react";
import { Grid, Paper, Divider } from "@mui/material";
import MessagePanelHeader from "./MessagePanelHeader.jsx";
import MessagePanelFooter from "./MessagePanelFooter.jsx";
import MessagePanelContent from "./MessagePanelContent.jsx";

const useSX = () => ({
    root: {
        height: "100%",
        borderRadius: 3,
        display: "flex",
    },
    container: {
        flexWrap: "nowrap"
    },
    messages: {
        flexGrow: 1,
        overflow: "auto",
        p: 3
    }
});

function MessagePanel() {
    const styles = useSX();

    return (
        <Paper variant="outlined" sx={styles.root}>
            <Grid container direction="column" sx={styles.container} >
                <Grid item>
                    <MessagePanelHeader />
                </Grid>
                <Divider />
                <Grid item sx={styles.messages}>
                    <MessagePanelContent/>
                </Grid>
                <Divider />
                <Grid item>
                    <MessagePanelFooter />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MessagePanel;