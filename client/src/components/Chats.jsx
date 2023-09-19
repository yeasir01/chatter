import React from "react";
import { Box, Grid, Paper, Typography, IconButton, Divider } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import ChatsList from "./ChatsList.jsx"
import SearchTextField from "./SearchTextField.jsx";

const useStyles = () => ({
    root: {
        minWidth: 300,
        borderRadius: 3
    },
    chatsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 0
    },
    title: {
        fontWeight: 700
    },
    search: {
        padding: 2,
        py: 1
    }
});

function Chats() {
    const styles = useStyles();

    return (
        <Paper variant="outlined" sx={styles.root}>
            <Grid container direction="column">
                <Grid item sx={{py: 1.5}}>
                    <Box sx={styles.chatsHeader}>
                        <IconButton>
                        <AddOutlinedIcon color="primary" />
                        </IconButton>
                        <Typography sx={styles.title} variant="h5">Chats</Typography>
                        <AvatarWithMenu />
                    </Box>
                    <Box sx={styles.search}>
                        <SearchTextField/>
                    </Box>
                </Grid>
                <Divider />
                <Grid item>
                    <ChatsList />
                </Grid>
                <Grid item>
                    <div>Hello3</div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Chats;
