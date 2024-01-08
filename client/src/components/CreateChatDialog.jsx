import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch.js";
import useFileUpload from "../hooks/useFileUpload.js";
import CreateChatDialogGroup from "./CreateChatDialogGroup.jsx";
import CreateChatDialogSearch from "./CreateChatDialogSearch.jsx";
import findExistingPrivateChat from "../utils/findExistingPrivateChat.js";

export default function CreateChatDialog({ open }) {
    const setModal = useStore((state) => state.setModal);
    const chats = useStore((state) => state.chats);
    const appendChat = useStore((state) => state.appendChat);
    const setSelectedChat = useStore((state) => state.setSelectedChat);
    const emitNewChatCreated = useStore((state) => state.emitNewChatCreated);
    const setSnackbar = useStore((state) => state.setSnackbar);

    const [showGroupForm, setShowGroupForm] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [groupName, setGroupName] = React.useState("");

    const { handleFileChange, url, file } = useFileUpload();
    const { handleFetch, loading } = useFetch();

/*     React.useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await handleFetch("/api/v1/user/users");
                setUsers(data.users || []);
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: err.message,
                    severity: "error",
                });
                console.error(err);
            }
        };

        getUsers();
    }, [handleFetch, setSnackbar]); */

    const isOpen = Boolean(open);
    const isGroup = checked.length > 1;

    const handleCheckToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const closeModal = () => {
        setModal(null);
    };

    const handleSearch = async (keyword) => {
        try {
            if(!keyword){
                setUsers([]);
                return;
            }
            
            const res = await handleFetch(`/api/v1/user/users?search=${keyword}`);
            setUsers(res.users);
        } catch (err) {
            console.log(err);
            setSnackbar({
                open: true,
                message: err.message,
                severity: "error",
            });
        }
    };

    const handleChatCreation = async () => {
        try {
            const id = findExistingPrivateChat(chats, checked);

            if (id) {
                setSelectedChat(id);
                closeModal();
                return;
            }

            const formData = new FormData();

            const data = {
                name: isGroup ? groupName : "",
                file: isGroup && file ? file : "",
                group: isGroup,
                participants: checked,
            };

            for (const key in data) {
                const value = data[key];
                formData.append(key, value);
            }

            const fetchOptions = {
                method: "POST",
                body: formData,
            };

            const chat = await handleFetch("/api/v1/chat", fetchOptions)
            
            appendChat(chat);
            emitNewChatCreated(chat);
            setSelectedChat(chat.id);
            closeModal();
            
        } catch (err) {
            console.log(err);
            setSnackbar({
                open: true,
                message: err.message,
                severity: "error",
            });
        }
    };

    return (
        <Dialog
            onClose={closeModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: 450, // Set your width here
                    },
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {showGroupForm ? "Group Details" : "Find People"}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ maxHeight: 300, overflowY: "auto" }} dividers>
                {showGroupForm ? (
                    <CreateChatDialogGroup
                        handleFileChange={handleFileChange}
                        imgSrc={url}
                        input={groupName}
                        setInput={setGroupName}
                    />
                ) : (
                    <CreateChatDialogSearch
                        onSubmit={handleSearch}
                        loading={loading}
                        users={users}
                        handleToggle={handleCheckToggle}
                        checkList={checked}
                    />
                )}
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
                    {showGroupForm ? (
                        <>
                            <Button onClick={() => setShowGroupForm(false)}>
                                Back
                            </Button>
                            <Button
                                disabled={groupName.trim().length < 3}
                                onClick={handleChatCreation}
                            >
                                Create
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1">{`${checked.length} Selected`}</Typography>

                            {isGroup ? (
                                <Button onClick={() => setShowGroupForm(true)}>
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    disabled={checked.length < 1}
                                    onClick={handleChatCreation}
                                >
                                    Create
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
}
