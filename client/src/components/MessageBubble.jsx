import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import useStore from "../hooks/useStore.js";

const useSX = (me) => ({
    container: {
        flexWrap: "nowrap",
        justifyContent: me ? "end" : "start",
        flexDirection: me ? "row-reverse" : "row",
        gap: 2,
        mb: 2
    },
    avatar: {
        alignSelf: "flex-end",
    },
    bubble: {
        position: "relative",
        maxWidth: 400, //255
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
            height: "24px",
            bgcolor: me ? "primary.main" : "grey.200",
            bottom: 0,
            content: "''",
            [me ? "right" : "left"]: -8,
            [me ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 28,
        },
        "&:after": {
            position: "absolute",
            transform: "translateZ(-1px)",
            width: "12px",
            height: "24px",
            bgcolor: "background.paper",
            bottom: 0,
            content: "''",
            [me ? "right" : "left"]: -12,
            [me ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 14,
        },
    }
});


function MessageBubble({data}) {
    const id = useStore((state)=>state.id)
    const styles = useSX(data.senderId === id);
    
    return (
        <Grid container sx={styles.container}>
            <Grid item sx={styles.avatar}>
                <Avatar>YH</Avatar>
            </Grid>
            <Grid item sx={styles.bubble}>
                <Typography variant="body1">
                    {data.content}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MessageBubble;
