import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useStore from "../hooks/useStore.js";
import Box from "@mui/material/Box";
import { Typography, TextField, Stack, Avatar, Skeleton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CreateChatDialog({ open }) {
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
        username: "",
    });

    const updateUi = useStore((state) => state.updateUi);
    const { getAccessTokenSilently } = useAuth0();

    const isOpen = Boolean(open);

    React.useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const token = await getAccessTokenSilently();
                const response = await fetch("/api/v1/user/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.results);
                    console.log(data.results);
                } else {
                    throw Error("Unable to fetch profile.");
                }
            } catch (error) {
                console.warn(error.message);
                setUserData({});
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [getAccessTokenSilently]);

    const handleClose = () => {
        updateUi();
    };

    const handleSave = () => {
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
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
                    My Profile
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
                <DialogContent dividers>
                    {loading ? (
                        <Box sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    flexBasis: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={100}
                                    height={100}
                                    animation="wave"
                                />
                                <Skeleton animation="wave" width={150} height={40} />
                                <Skeleton animation="wave" width={100} height={19} />
                            </Box>
                            <Stack spacing={2} sx={{ flexBasis: "50%" }}>
                                <Skeleton animation="wave" height={40} />
                                <Skeleton animation="wave" height={40} />
                                <Skeleton animation="wave" height={40} />
                                <Skeleton animation="wave" height={40} />
                            </Stack>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    flexBasis: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    src={userData.picture}
                                    sx={{
                                        height: "100px",
                                        width: "100px",
                                        fontSize: "50px",
                                        mb: 1,
                                        border: (theme) =>
                                            `1px solid ${theme.palette.grey["400"]}`,
                                    }}
                                >
                                    {`${userData.firstName} ${userData.lastName}`}
                                </Avatar>
                                <Typography variant="h5">{`${userData.firstName} ${userData.lastName}`}</Typography>
                                <Typography color="primary" variant="caption">
                                    {userData.email}
                                </Typography>
                            </Box>
                            <Stack spacing={2} sx={{ flexBasis: "50%" }}>
                                <TextField
                                    onInput={handleInputChange}
                                    value={userData.firstName}
                                    name="firstName"
                                    label="First Name"
                                    size="small"
                                />
                                <TextField
                                    onInput={handleInputChange}
                                    value={userData.lastName}
                                    name="lastName"
                                    label="Last Name"
                                    size="small"
                                />
                                <TextField
                                    onInput={handleInputChange}
                                    value={userData.email}
                                    name="email"
                                    label="Email"
                                    size="small"
                                />
                                {/* <TextField label="Bio" size="small" multiline maxRows={4}/> */}
                                <TextField
                                    onInput={handleInputChange}
                                    value={userData.username}
                                    name="username"
                                    label="Username"
                                    size="small"
                                />
                            </Stack>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
