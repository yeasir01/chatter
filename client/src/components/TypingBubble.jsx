import React from "react";
import { Grid, Avatar, Fade, Box } from "@mui/material";
import useStore from "../hooks/useStore.js";
import ThreeLoadingDots from "./ThreeLoadingDots.jsx";

const useSX = (me) => ({
    container: {
        flexWrap: "nowrap",
        justifyContent: me ? "end" : "start",
        flexDirection: me ? "row-reverse" : "row",
        gap: 1,
    },
    avatar: {
        alignSelf: "flex-end",
        zIndex: 2,
    },
    bubble: {
        maxWidth: { sm: 400, xs: 320 }, //255
        borderRadius: 6,
        transformStyle: "preserve-3d", //used for stacking
        bgcolor: me ? "primary.main" : "secondary.main",
        color: me ? "primary.contrastText" : "secondary.contrastText",
        py: 1,
        px: 2,
    }
});

function TypingBubble({ userId }) {
    const user = useStore((state) => state.user);
    const profiles = useStore((state) => state.profiles);
    const isLoggedInUser = (userId === user.id);
    const styles = useSX(isLoggedInUser);

    const profile = isLoggedInUser ? user : profiles[userId];

    return (
        <Box width="100%">
            <Fade direction="up" in={true} timeout={400}>
                <Box>
                    <Grid container sx={styles.container}>
                        <Grid item sx={styles.avatar}>
                            <Avatar src={profile.picture} />
                        </Grid>
                        <Grid item sx={styles.bubble}>
                            <ThreeLoadingDots color={isLoggedInUser ? "primary.contrastText" : "secondary.contrastText"}/>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Box>
    );
}

export default TypingBubble;
