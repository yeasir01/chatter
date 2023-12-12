import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Typography,
    Box,
    Stack,
    Badge,
} from "@mui/material";
import formatDateTime from "../utils/dateFormat.js";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";
import { styled } from "@mui/material/styles";
import AvatarWithBadge from "./AvatarWithBadge.jsx";

const useSX = () => ({
    content: {
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    button: {
        borderRadius: 3,
        padding: 1.5,
    },
    badge: {
        display: "flex",
        alignItems: "center",
        padding: 1.1,
        mr: 0.12,
    },
});

const Item = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}));

function ChatListItem({ chat }) {
    const styles = useSX();
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

    return (
        <>
            <ListItem>
                <ListItemButton
                    sx={styles.button}
                    selected={selectedChat === chat.id}
                    onClick={handleChatSelect}
                >
                    <ListItemAvatar>
                        <AvatarWithBadge
                            src={picture}
                            alt={title}
                            online={isOnline}
                        />
                    </ListItemAvatar>
                    <Stack sx={{ width: "100%" }}>
                        <Item>
                            <Typography noWrap sx={{ maxWidth: "170px" }}>
                                {title}
                            </Typography>
                            <Typography variant="caption">{date}</Typography>
                        </Item>
                        <Item>
                            {userTyping ? (
                                <Typography
                                    sx={styles.content}
                                    variant="body2"
                                    color="primary.main"
                                >
                                    {`${
                                        profiles[userTyping]?.firstName || ""
                                    } is typing ...`}
                                </Typography>
                            ) : (
                                <Typography
                                    sx={styles.content}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {content}
                                </Typography>
                            )}
                            <Box sx={styles.badge}>
                                <Badge
                                    color="primary"
                                    badgeContent={notificationCount}
                                    overlap="circular"
                                    component="div"
                                />
                            </Box>
                        </Item>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default React.memo(ChatListItem);
