import React from "react";
import {
    ListItemAvatar,
    ListItemButton,
    Typography,
    Box,
    ListItem,
    Stack,
    ListItemText,
} from "@mui/material";
import formatDateTime from "../utils/dateFormat.js";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";
import AvatarWithBadge from "./AvatarWithBadge.jsx";
import InlineBadge from "./InlineBadge.jsx";
import { styled } from "@mui/material/styles";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    "&.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));

function ChatListItem({ chat }) {
    //const styles = useSX();
    const selectedChat = useStore((state) => state.selectedChat);
    const setSelectedChat = useStore((state) => state.setSelectedChat);
    const setUiState = useStore((state) => state.setUiState);
    const participant = useStore((state) => state.getParticipant(chat));
    const profiles = useStore((state) => state.profiles);
    const notification = useStore((state) => state.notifications);
    const typing = useStore((state) => state.typing);

    const group = chat.group;
    const notificationCount = notification[chat.id];

    const title = group ? chat.name : getParticipantFullName(participant);
    const picture = group ? chat.picture : participant.picture;
    const date = formatDateTime(chat?.lastMessage?.updatedAt || chat.updatedAt);
    const isOnline = group ? false : participant.online;

    const handleChatSelect = () => {
        setSelectedChat(chat.id);
        setUiState("messages");
    };

    const getContent = (chatObj) => {
        const fallBackMsg = "No message to display.";

        const lastMessage = chatObj.lastMessage;
        if (!lastMessage) return fallBackMsg;

        const text = lastMessage.content;
        if (text) return text;

        const file = lastMessage.attachment;
        if (file) return "📷 Image";

        return fallBackMsg;
    };

    const content = getContent(chat);
    const userTyping = typing[chat.id];
    const typingTxt = group
        ? `${profiles[userTyping]?.firstName} is typing...`
        : "Typing...";

    return (
        <StyledListItemButton
            selected={selectedChat === chat.id}
            onClick={handleChatSelect}
            sx={{ width: "100%" }}
        >
            <Box sx={{ overflow: "hidden", width: "100%" }}>
                <ListItem disableGutters>
                    <ListItemAvatar>
                        <AvatarWithBadge
                            src={picture}
                            alt={title}
                            online={isOnline}
                            group={group}
                        />
                    </ListItemAvatar>
                    <Stack
                        sx={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            overflow: "hidden",
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" noWrap>
                                    {title}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    noWrap
                                    fontStyle={userTyping ? "italic" : "normal"}
                                    color="text.secondary"
                                >
                                    {userTyping ? typingTxt : content}
                                </Typography>
                            }
                        />
                        <Box sx={{ textAlign: "right", marginY: 0.8 }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                            >
                                {date}
                            </Typography>
                            <InlineBadge
                                color="error"
                                count={notificationCount}
                                sx={{ fontSize: "0.75rem", height: 22 }}
                            />
                        </Box>
                    </Stack>
                </ListItem>
            </Box>
        </StyledListItemButton>
    );
}

export default React.memo(ChatListItem);
