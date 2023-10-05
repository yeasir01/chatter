import React from "react";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import ChatsList from "./ChatsList.jsx"
import SearchTextField from "./SearchTextField.jsx";

const useSX = () => ({
    root: {
        height: "100%",
        borderRadius: 3,
        display: "flex"
    },
    gridContainer: {
        MinHeight: "100%"
    },
    header: {
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
        p: 2,
    },
    chats: {
        flexGrow: 1
    }
});

function Chats() {
    const styles = useSX();

    return (
        <Paper variant="outlined" sx={styles.root}>
            <Grid container direction="column" sx={styles.gridContainer}>
                <Grid item sx={{pt: 1.5}}>
                    <Box sx={styles.header}>
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
                <Grid item sx={styles.chats}>
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