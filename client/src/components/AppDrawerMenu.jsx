import React from "react";
import { useLocation, Link } from "react-router-dom";
import { List, ListItem, ListItemButton, Box } from "@mui/material";
import Avatar from "./Avatar.jsx";
import {
    BubbleChartOutlined,
    TextsmsOutlined,
    Textsms,
    Person,
    PersonOutline,
    Groups,
    GroupsOutlined,
} from "@mui/icons-material";

const useStyles = () => ({
    list: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    listItem: {
        justifyContent: "center",
        alignItems: "center"
    },
    listItemButton: {
        borderRadius: 2,
        padding: 2,
        gap: 0,
        color: "text.secondary",
        "&.Mui-selected": {
            //background: "transparent",
            "&:hover": {},
        },
    },
});

const menu = [
    {
        name: "Chats",
        path: "/dashboard",
        Icon: TextsmsOutlined,
        ActiveIcon: Textsms,
    },
    {
        name: "Community",
        path: "/dashboard/community",
        Icon: GroupsOutlined,
        ActiveIcon: Groups,
    },
    {
        name: "Profile",
        path: "/dashboard/profile",
        Icon: PersonOutline,
        ActiveIcon: Person,
    },
];

function AppDrawerMenu(props) {
    const location = useLocation();
    const styles = useStyles();

    const { sx, ...rest } = props;

    return (
        <List sx={{ ...styles.list, ...sx }} {...rest}>
            <Box>
                <ListItem sx={styles.listItem}>
                    <BubbleChartOutlined fontSize="large" color="primary" />
                </ListItem>
            </Box>
            <Box>
                {menu.map((item) => (
                    <ListItem key={item.name} sx={styles.listItem}>
                        <ListItemButton
                            sx={styles.listItemButton}
                            selected={location.pathname === item.path}
                            LinkComponent={Link}
                            to={item.path}
                        >
                            {location.pathname === item.path ? (
                                <item.ActiveIcon color="primary" />
                            ) : (
                                <item.Icon color="action" />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
            <Box>
                <ListItem sx={styles.listItem}>
                    <Avatar />
                </ListItem>
            </Box>
        </List>
    );
}

export default AppDrawerMenu;
