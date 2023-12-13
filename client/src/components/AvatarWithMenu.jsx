import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import { Avatar,
    Menu,
    MenuItem,
    IconButton,
    Grow,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
} from "@mui/material";
import {
    AccountCircleOutlined,
    LogoutOutlined,
    SettingsOutlined,
} from "@mui/icons-material";
import useStore from "../hooks/useStore.js";
import getParticipantFullName from "../utils/nameFormat.js";

const AvatarBorderBox = styled(Box)(({ theme, connected }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.background.paper,
    borderRadius: "50%",
    height: 48,
    width: 48,
    borderWidth: "medium",
    borderStyle: "solid",
    borderColor: (connected === "true")
        ? theme.palette.success.main
        : theme.palette.error.main,
}));

const useSX = () => ({
    paper: {
        borderRadius: 1,
    },
    menuItem: {
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
    },
    icon: {
        justifyContent: "flex-end",
    },
});

function AvatarWithMenu() {
    const [anchor, setAnchor] = React.useState(null);
    const isConnected = useStore((state) => state.isConnected);
    const setModal = useStore((state) => state.setModal);
    const userId = useStore((state) => state.userId);
    const profiles = useStore((state) => state.profiles);

    const { logout } = useAuth0();
    const styles = useSX();

    const open = Boolean(anchor);
    const user = profiles[userId];
    const picture = user ? user.picture : "";
    const fullName = user ? getParticipantFullName(user) : "unknown";

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleUpdate = (identifier) => {
        setModal(identifier);
        handleClose();
    };

    const handleLogout = () => {
        logout({
            logoutParams: { returnTo: window.location.origin },
        });
    };
    
    return (
        <>
            <IconButton
                id="avatar-button"
                aria-controls={open ? "avatar-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <AvatarBorderBox connected={isConnected ? "true" : null}>
                    <Avatar alt={fullName} src={picture} />
                </AvatarBorderBox>
            </IconButton>
            <Menu
                id="avatar-menu"
                anchorEl={anchor}
                slotProps={{
                    paper: {
                        sx: styles.paper,
                        variant: "outlined",
                        elevation: 0,
                    },
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "avatar-button",
                }}
                TransitionComponent={Grow}
                TransitionProps={{ timeout: 200 }}
            >
                <MenuItem
                    sx={styles.menuItem}
                    onClick={() => handleUpdate("profile")}
                >
                    <ListItemText>My Profile</ListItemText>
                    <ListItemIcon sx={styles.icon}>
                        <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem
                    sx={styles.menuItem}
                    onClick={() => handleUpdate("settings")}
                >
                    <ListItemText>Device Settings</ListItemText>
                    <ListItemIcon sx={styles.icon}>
                        <SettingsOutlined fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <Divider />
                <MenuItem sx={styles.menuItem} onClick={handleLogout}>
                    <ListItemText>Logout</ListItemText>
                    <ListItemIcon sx={styles.icon}>
                        <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AvatarWithMenu;
