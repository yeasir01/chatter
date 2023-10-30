import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import useStore from "../hooks/useStore.js";
import useFetch from "../hooks/useFetch-copy.js";
import CreateChatDialogGroup from "./CreateChatDialogGroup.jsx";
import CreateChatDialogSearch from "./CreateChatDialogSearch.jsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
        },
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CreateChatDialog({ open }) {
    const updateUi = useStore((state) => state.updateUi);
    const createNewChat = useStore((state) => state.createNewChat);
    const [showGroupForm, setShowGroupForm] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [imageUrl, setImageUrl] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [groupName, setGroupName] = React.useState("");

    const { response, isLoading, handleFetch } = useFetch("/api/v1/user/users");

    const fileRef = React.useRef(null);

    React.useEffect(() => {
        let fileToRevoke = fileRef.current;

        if (response?.users) {
            setUsers(response.users);
        }

        return () => {
            if (fileToRevoke) {
                URL.revokeObjectURL(fileToRevoke);
            }
        };
    }, [response]);

    const isOpen = Boolean(open);
    const isGroup = checked.length > 1;

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

    const handleApiSearchQuery = async (event, keyword) => {
        try {
            event.preventDefault();
            const res = await handleFetch(`/api/v1/user/users?search=${keyword}`)
            setUsers(res.users)
        } catch (err) {
            console.log(err)
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImageUrl(fileURL);
            setFile(file);
            fileRef.current = fileURL;
        }
    };

    const handleChatCreation = () => {
        const formData = new FormData();

        const data = {
            name: isGroup ? groupName : null,
            file: isGroup && file ? file : null,
            group: isGroup,
            participants: checked,
        };

        for (const key in data) {
            formData.append(key, data[key]);
        }

        const fetchOptions = {
            method: "POST",
            body: formData
        }

        handleFetch("/api/v1/chat", fetchOptions)
            .then((res) => {
                createNewChat(res)
                handleClose();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
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
                {showGroupForm ? (
                    <CreateChatDialogGroup
                        handleFileChange={handleFileChange}
                        imgSrc={imageUrl}
                        input={groupName}
                        setInput={setGroupName}
                    />
                ) : (
                    <CreateChatDialogSearch
                        onSubmit={handleApiSearchQuery}
                        loading={isLoading}
                        users={users}
                        handleToggle={handleToggle}
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
        </BootstrapDialog>
    );
}
