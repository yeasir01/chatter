import React from "react";
import {
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
    button: {
        borderRadius: 3,
        padding: 1.5,
    },
    badge: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 1.1,
        ml: 1,
        mr: .5
    },
});

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    const typingTxt = group ? `${profiles[userTyping]?.firstName} is typing...` : "Typing...";

    return (
        <ListItemButton
            sx={styles.button}
            selected={selectedChat === chat.id}
            onClick={handleChatSelect}
        >
            <ListItemAvatar>
                <AvatarWithBadge src={picture} alt={title} online={isOnline} />
            </ListItemAvatar>
            <Box sx={{flexGrow:1, flexBasis: 0, overflow: "hidden"}}>
                <StyledBox>
                    <Typography noWrap>{title}</Typography>
                
                    <Typography pt={0.25} variant="caption">
                        {date}
                    </Typography>
                </StyledBox>
                <StyledBox>
                    {userTyping ? (
                        <Typography
                            sx={{ fontStyle: "italic" }}
                            variant="body2"
                            color="primary.main"
                            pt={0.25}
                            noWrap
                        >
                            {typingTxt}
                        </Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            pt={0.25}
                            noWrap
                        >
                            {content}
                        </Typography>
                    )}
                    <Box sx={styles.badge}>
                        <Badge
                            color="error"
                            badgeContent={notificationCount}
                            overlap="circular"
                        />
                    </Box>
                </StyledBox>
            </Box>
        </ListItemButton>
    );
}

export default React.memo(ChatListItem);
