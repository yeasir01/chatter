import React from "react";
import { Grid, Avatar, Typography, Fade } from "@mui/material";
import useStore from "../hooks/useStore.js";

const useSX = (me) => ({
    container: {
        flexWrap: "nowrap",
        justifyContent: me ? "end" : "start",
        flexDirection: me ? "row-reverse" : "row",
        gap: 1,
        mb: 2
    },
    avatar: {
        alignSelf: "flex-end",
        zIndex: 2,
    },
    bubble: {
        position: "relative",
        maxWidth: 400, //255
        whiteSpace: "pre-line",
        wordWrap: "break-word",
        borderRadius: 6,
        transformStyle: "preserve-3d", //used for stacking
        bgcolor: me ? "primary.main" : "grey.200",
        color: me ? "primary.contrastText" : "grey.900",
        py: 1,
        px: 2,
        "&:before": {
            position: "absolute",
            transform: "translateZ(-1px)",
            width: "24px",
            height: "22px",
            bgcolor: me ? "primary.main" : "grey.200",
            bottom: 0,
            content: "''",
            [me ? "right" : "left"]: -8,
            [me ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 22,
        },
        "&:after": {
            position: "absolute",
            transform: "translateZ(-1px)",
            width: "12px",
            height: "22px",
            bgcolor: "background.paper",
            bottom: 0,
            content: "''",
            [me ? "right" : "left"]: -12,
            [me ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 14,
        },
    }
});

function MessageBubble({message}) {
    const userId = useStore((state)=> state.userId)
    const profiles = useStore((state)=> state.profiles)

    const user = profiles[message.senderId];
    const styles = useSX(message.senderId === userId);

    return (
        <Fade in unmountOnExit>
            <Grid container sx={styles.container}>
                <Grid item sx={styles.avatar}>
                    <Avatar src={user.picture} />
                </Grid>
                <Grid item sx={styles.bubble}>
                    <Typography variant="body1">
                        {message.content}
                    </Typography>
                </Grid>
            </Grid>
        </Fade>
    );
}

export default MessageBubble;
