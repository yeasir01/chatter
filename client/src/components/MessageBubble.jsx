import React from "react";
import { Avatar, Typography, Fade, Box, Stack, Collapse } from "@mui/material";
import { LinkItUrl } from "react-linkify-it";
import useStore from "../hooks/useStore.js";
import ImagePreview from "./ImagePreview.jsx";
import { styled } from "@mui/material/styles";
import { formatDateTime } from "../utils/dateFormat.js";
import getParticipantFullName from "../utils/nameFormat.js";

const StyledChatBubble = styled(Box)(({ theme, user }) => ({
    position: "relative",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    borderRadius: theme.shape.borderRadius * 1.75,
    transformStyle: "preserve-3d", //used for stacking
    zIndex: 1,
    backgroundColor: user
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    color: user
        ? theme.palette.primary.contrastText
        : theme.palette.secondary.contrastText,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    maxWidth: 400,
    "&:before": {
        position: "absolute",
        content: "''",
        bottom: 0,
        width: "24px",
        height: "22px",
        transform: "translateZ(-1px)",
        backgroundColor: user
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        [user ? "right" : "left"]: -8,
        [user ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 22,
    },
    "&:after": {
        position: "absolute",
        content: "''",
        bottom: 0,
        width: "12px",
        height: "22px",
        transform: "translateZ(-1px)",
        backgroundColor: theme.palette.background.paper,
        [user ? "right" : "left"]: -12,
        [user ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 14,
    },
    [theme.breakpoints.down("sm")]: {
        maxWidth: 300,
    },
}));

const StyledTypographyAndLinks = styled(Typography)(({ theme }) => ({
    "& a:link, & a:visited, & a:hover, & a:active": {
        color: "inherit",
    },
}));

function MessageBubble({ message }) {
    const user = useStore((state) => state.user);
    const profiles = useStore((state) => state.profiles);
    const [openDate, setOpenDate] = React.useState(false);

    const isLoggedInUser = user.id === message.senderId;

    const profile = isLoggedInUser ? user : profiles[message.senderId];
    const attachment = message.attachment;
    const fileName = message.fileName;

    React.useEffect(() => {
        let timeout;

        if (openDate) {
            timeout = setTimeout(() => {
                setOpenDate(false);
            }, 4000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [openDate]);

    const toggleOpenDate = () => {
        setOpenDate((prev) => !prev);
    };

    return (
        <Box component={"li"} sx={{ my: 2, mx: 2, listStyle: "none" }}>
            <Fade in={true} timeout={400}>
                <Box>
                    <Stack
                        gap={1}
                        direction={isLoggedInUser ? "row-reverse" : "row"}
                    >
                        <Box sx={{ alignSelf: "flex-end" }}>
                            <Avatar
                                src={profile.picture}
                                onClick={toggleOpenDate}
                                sx={{ cursor: "pointer", zIndex: 2 }}
                            />
                        </Box>
                        <StyledChatBubble user={isLoggedInUser ? 1 : 0}>
                            {attachment && (
                                <ImagePreview src={attachment} alt={fileName} />
                            )}
                            <LinkItUrl>
                                <StyledTypographyAndLinks variant="body1">
                                    {message.content}
                                </StyledTypographyAndLinks>
                            </LinkItUrl>
                        </StyledChatBubble>
                    </Stack>
                    <Stack direction={isLoggedInUser ? "row-reverse" : "row"}>
                        <Collapse
                            orientation="vertical"
                            in={openDate}
                            timeout={{ enter: 300, exit: 700 }}
                            appear={true}
                        >
                            <Box pt={0.5}>
                                <Typography noWrap variant="caption">
                                    <strong>{`${getParticipantFullName(profile)}:`}</strong>
                                    {` ${formatDateTime(message.createdAt)}`}
                                </Typography>
                            </Box>
                        </Collapse>
                    </Stack>
                </Box>
            </Fade>
        </Box>
    );
}

export default MessageBubble;
