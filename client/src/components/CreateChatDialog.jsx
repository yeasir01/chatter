import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import {
    Box,
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    Typography,
    CircularProgress
} from "@mui/material";
import useStore from "../hooks/useStore.js";
import SearchTextField from "./SearchTextField.jsx";
import { useAuth0 } from "@auth0/auth0-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

/* const mock = [
    {
        id: "1",
        firstName: "John",
        lastName: "Kenneth",
        picture:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png",
    },
    {
        id: "2",
        firstName: "Mike",
        lastName: "Jones",
        picture:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png",
    },
    {
        id: "3",
        firstName: "Sam",
        lastName: "Hughes",
        picture:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/b3053232163929.567197ac6e6f5.png",
    },
    {
        id: "4",
        firstName: "Jose",
        lastName: "Martinez",
        picture:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/b3053232163929.567197ac6e6f5.png",
    },
]; */

export default function CreateChatDialog({ open }) {
    const updateUi = useStore((state) => state.updateUi);
    const [loading, setLoading] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
console.log(checked)
    const { getAccessTokenSilently } = useAuth0();

    const isOpen = Boolean(open);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleClose = () => {
        updateUi();
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setLoading(true);

            const token = await getAccessTokenSilently();
            const response = await fetch(`/api/v1/user/users?search=${input}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsers(data.results.users);
            }
        } catch (error) {
            console.warn(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputUpdate = (content) => {
        setInput(content);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px", // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    New Conversation
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ maxHeight: 300 }} dividers>
                    <Box component={"form"} onSubmit={handleSubmit}>
                        <SearchTextField
                            placeholder="Search for people..."
                            value={input}
                            setValue={handleSearchInputUpdate}
                            autoComplete="off"
                        />
                    </Box>
                    <List sx={{ width: "100%" }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', width: "100%", justifyContent: "center", p:2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            users.map((user) => {
                                const labelId = `checkbox-list-secondary-label-${user.id}`;
                                return (
                                    <ListItem
                                        divider
                                        key={user.id}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(user.id)}
                                                checked={
                                                    checked.indexOf(user.id) !==
                                                    -1
                                                }
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={
                                                        user.firstName +
                                                        " " +
                                                        user.lastName
                                                    }
                                                    src={user.picture}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                id={labelId}
                                                primary={user.username}
                                                secondary={`${user.firstName} ${user.lastName}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            pl: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="subtitle1">{`${checked.length} Selected`}</Typography>
                        <Button
                            disabled={checked.length < 1}
                            onClick={handleClose}
                        >
                            Create
                        </Button>
                    </Box>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
