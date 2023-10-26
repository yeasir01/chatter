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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CreateChatDialog({ open }) {
    const ENDPOINT = "/api/v1/user/profile";

    const [initialFormData, setInitialFormData] = React.useState({});
    const [currentFormData, setCurrentFormData] = React.useState({});
    const [imageUrl, setImageUrl] = React.useState("");
    const [file, setFile] = React.useState(null);
    
    const { response, isLoading, handleFetch } = useFetch(ENDPOINT);
    
    //Need a ref to revoke ObjectURL on unmount
    const fileRef = React.useRef(null);

    const updateUi = useStore((state) => state.updateUi);

    const isOpen = Boolean(open);

    React.useEffect(() => {
        let fileToRevoke = fileRef.current;

        if (response) {
            const { picture, ...rest } = response;
            setInitialFormData(rest);
            setCurrentFormData(rest);
            setImageUrl(picture);
        }

        return () => {
            if (fileToRevoke) {URL.revokeObjectURL(fileToRevoke)}
        }
    
    }, [response]);

    const handleClose = () => {
        updateUi();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const changes = {};
        const formDataToUpdate = new FormData();

        //Perform shallow comparison between initial data and current.
        //Set props and values where objects differ.
        for (const key in currentFormData) {
            if (currentFormData[key] !== initialFormData[key]) {
                changes[key] = currentFormData[key];
            }
        }

        if (file) {
            formDataToUpdate.append("avatar", file);
        }

        // Append the changes to the formData object.
        for (const key in changes) {
            formDataToUpdate.append(key, changes[key]);
        }

        //Patch request
        handleFetch(ENDPOINT, { method: "PATCH", body: formDataToUpdate });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentFormData((prev) => ({ ...prev, [name]: value }));
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

    return (
        <div>
            <BootstrapDialog
                component="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
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
                    {isLoading ? (
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
                                    src={imageUrl}
                                    onChange={handleFileChange}
                                    size={100}
                                    name="profileImg"
                                    alt="profile"
                                >
                                    {"YH"}
                                </AvatarPhotoUpload>
                                <Typography variant="h5">{`${currentFormData.firstName} ${currentFormData.lastName}`}</Typography>
                                <Typography color="primary" variant="caption">
                                    {currentFormData.email}
                                </Typography>
                            </Box>
                            <Stack spacing={2} sx={{ flexBasis: "50%" }}>
                                <TextField
                                    onChange={handleInputChange}
                                    value={currentFormData.firstName || ""}
                                    name="firstName"
                                    label="First Name"
                                    size="small"
                                    type="text"
                                />
                                <TextField
                                    onChange={handleInputChange}
                                    value={currentFormData.lastName || ""}
                                    name="lastName"
                                    label="Last Name"
                                    size="small"
                                    type="text"
                                />
                                <TextField
                                    onChange={handleInputChange}
                                    value={currentFormData.email || ""}
                                    name="email"
                                    label="Email"
                                    size="small"
                                    type="email"
                                />
                                {/* <TextField label="Bio" size="small" multiline maxRows={4}/> */}
                                <TextField
                                    onChange={handleInputChange}
                                    value={currentFormData.username || ""}
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
