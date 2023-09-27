import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import {
    Avatar as MuiAvatar,
    Menu,
    MenuItem,
    IconButton,
    Grow,
    ListItemIcon,
    ListItemText,
    Divider,
    Badge,
} from "@mui/material";
import {
    AccountCircleOutlined,
    LogoutOutlined,
    SettingsOutlined,
} from "@mui/icons-material";
import useSocketStore from "../stores/useSocketStore";

const StyledBadge = styled(Badge)(({ theme, status}) => ({
    "& .MuiBadge-badge": {
        backgroundColor: `${
            status === "connected" ? theme.palette.success.main : theme.palette.error.main
        }`,
        color: `${
            status === "connected" ? theme.palette.success.main : theme.palette.error.main
        }`,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const useSX = () => ({
    paper: {
        borderRadius: 2,
    },
    menuItem: {
        px: 2.5,
        display: "flex",
        justifyContent: "space-between",
        gap: 3
    },
    icon: {
        justifyContent: "flex-end",
    },
    avatar: {
        width: 40,
        height: 40,
    }
});

function AvatarWithMenu() {
    const [anchor, setAnchor] = React.useState(null);
    const { user, logout } = useAuth0();
    const isConnected = useSocketStore(state=>state.isConnected);
    const styles = useSX();

    const open = Boolean(anchor);
    
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
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
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    status={isConnected ? "connected" : ""}
                >
                    <MuiAvatar sx={styles.avatar} alt={user.nickname} src={user.picture} />
                </StyledBadge>
            </IconButton>
            <Menu
                id="avatar-menu"
                anchorEl={anchor}
                slotProps={{ paper: { sx: styles.paper, variant: "outlined", elevation: 0 } }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "avatar-button",
                }}
                TransitionComponent={Grow}
            >
                <MenuItem sx={styles.menuItem} onClick={handleClose}>
                    <ListItemText>Profile</ListItemText>
                    <ListItemIcon sx={styles.icon}>
                        <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem sx={styles.menuItem} onClick={handleClose}>
                    <ListItemText>Settings</ListItemText>
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
