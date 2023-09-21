import React from "react";
import colorGenerator from "../utils/colorGenerator";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Typography,
    IconButton,
    AvatarGroup,
    Avatar,
} from "@mui/material";

const useSX = () => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
    },
    title: {
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    avatar: {
        height: 35,
        width: 35
    }
});

function MessagePanelHeader() {
    const styles = useSX();

    return (
        <Box sx={styles.root}>
            <Box sx={styles.title}>
                <AvatarGroup spacing="small" max={3}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={[styles.avatar, colorGenerator("Remy Sharp")]}
                    />
                    <Avatar
                        alt="Mike Tyson"
                        src="/static/images/avatar/1.jpg"
                        sx={[styles.avatar, colorGenerator("Mike Tyson")]}
                    />
                    <Avatar
                        alt="Jessie James"
                        src="/static/images/avatar/1.jpg"
                        sx={[styles.avatar, colorGenerator("Jessie James")]}
                    />
                </AvatarGroup>
                <Typography variant="h5">Front End Team</Typography>
            </Box>
            <IconButton>
                <MoreVertIcon color="primary" />
            </IconButton>
        </Box>
    );
}

export default MessagePanelHeader;
