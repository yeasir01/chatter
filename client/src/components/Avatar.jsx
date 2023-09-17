import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar as MuiAvatar, Menu, MenuItem, IconButton, Grow, ListItemIcon, ListItemText } from "@mui/material";
import { ManageAccountsOutlined, LogoutOutlined } from "@mui/icons-material";

function Avatar() {
    const [anchor, setAnchor] = React.useState(null);
    const { user, logout } = useAuth0();

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
        })
    }

    return (
        <>
            <IconButton
                id="avatar-button"
                aria-controls={open ? "avatar-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MuiAvatar alt={user.nickname} src={user.picture} />
            </IconButton>
            <Menu
                id="avatar-menu"
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'avatar-button',
                }}
                TransitionComponent={Grow}
                transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ManageAccountsOutlined fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export default Avatar;
