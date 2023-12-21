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
import { Typography, TextField, Stack, Skeleton } from "@mui/material";
import useFetch from "../hooks/useFetch.js";
import AvatarPhotoUpload from "./AvatarPhotoUpload.jsx";
import useFileUpload from "../hooks/useFileUpload.js";
import {
    profileSchema,
    validateField,
} from "../validators/yupValidationSchema.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function ProfileDialog({ open }) {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const emitUserProfileUpdate = useStore(
        (state) => state.emitUserProfileUpdate
    );
    const setModal = useStore((state) => state.setModal);

    const [currentFormData, setCurrentFormData] = React.useState({...user});
    const [formErrors, setFormErrors] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    const { handleFileChange, url, file } = useFileUpload(user.picture);
    const { handleFetch, loading, error } = useFetch();

    const isOpen = Boolean(open);

    const handleCloseModal = () => {
        setModal(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const changes = {};
            const formData = new FormData();

            //Perform a shallow comparison between current user data and newly typed data.
            //set props on changes obj where objects differ.
            for (const key in currentFormData) {
                if (currentFormData[key] !== user[key]) {
                    changes[key] = currentFormData[key];
                }
            }

            if (file) {
                formData.append("file", file);
            }

            // Append the changes to the formData object.
            for (const key in changes) {
                formData.append(key, changes[key]);
            }

            const opt = {
                method: "PATCH",
                body: formData,
            };

            const data = await handleFetch("/api/v1/user/profile", opt);
            emitUserProfileUpdate(data);
            setUser(data);
            handleCloseModal();
        } catch (err) {
            console.log(err.errors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(profileSchema, setFormErrors, name, value);
    };

    return (
        <div>
            <BootstrapDialog
                component="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                onClose={handleCloseModal}
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
                    onClick={handleCloseModal}
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
                                <Skeleton
                                    animation="wave"
                                    width={150}
                                    height={40}
                                />
                                <Skeleton
                                    animation="wave"
                                    width={100}
                                    height={19}
                                />
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
                                <AvatarPhotoUpload
                                    src={url}
                                    onChange={handleFileChange}
                                    size={100}
                                    name="profileImg"
                                    alt="profile"
                                >
                                    {"YH"}
                                </AvatarPhotoUpload>
                                <Typography variant="h5">{`${
                                    currentFormData.firstName || ""
                                } ${
                                    currentFormData.lastName || ""
                                }`}</Typography>
                                <Typography color="primary" variant="caption">
                                    {currentFormData.email}
                                </Typography>
                            </Box>
                            <Stack spacing={2} sx={{ flexBasis: "50%" }}>
                                <TextField
                                    onChange={handleInputChange}
                                    required
                                    value={currentFormData.firstName || ""}
                                    onBlur={handleBlur}
                                    error={Boolean(formErrors.firstName)}
                                    helperText={formErrors.firstName}
                                    name="firstName"
                                    label="First Name"
                                    size="small"
                                    type="text"
                                />
                                <TextField
                                    onChange={handleInputChange}
                                    required
                                    value={currentFormData.lastName || ""}
                                    onBlur={handleBlur}
                                    error={Boolean(formErrors.lastName)}
                                    helperText={formErrors.lastName}
                                    name="lastName"
                                    label="Last Name"
                                    size="small"
                                    type="text"
                                />
                                <TextField
                                    onChange={handleInputChange}
                                    required
                                    value={currentFormData.email || ""}
                                    onBlur={handleBlur}
                                    error={Boolean(formErrors.email)}
                                    helperText={formErrors.email}
                                    name="email"
                                    label="Email"
                                    size="small"
                                    type="email"
                                />
                                {/* <TextField label="Bio" size="small" multiline maxRows={4}/> */}
                                <TextField
                                    onChange={handleInputChange}
                                    required
                                    value={currentFormData.username || ""}
                                    onBlur={handleBlur}
                                    error={Boolean(formErrors.username)}
                                    helperText={formErrors.username}
                                    name="username"
                                    label="Username"
                                    size="small"
                                    type="text"
                                />
                            </Stack>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
