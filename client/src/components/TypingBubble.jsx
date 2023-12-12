import React from "react";
import { Grid, Avatar, Grow } from "@mui/material";
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
        bgcolor: me ? "primary.main" : "grey.200",
        color: me ? "primary.contrastText" : "grey.900",
        py: 1,
        px: 2,
    }
});

function TypingBubble({ userId }) {
    const id = useStore((state) => state.userId);
    const profiles = useStore((state) => state.profiles);
    const styles = useSX(userId === id);

    const user = profiles[userId];

    return (
        <Grow in={true}>
            <Grid container sx={styles.container}>
                <Grid item sx={styles.avatar}>
                    <Avatar src={user.picture} />
                </Grid>
                <Grid item sx={styles.bubble}>
                    <ThreeLoadingDots/>
                </Grid>
            </Grid>
        </Grow>
    );
}

export default TypingBubble;
