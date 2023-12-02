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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Typography, Switch } from "@mui/material";
import themes from "../themes/index.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CreateChatDialog({ open }) {
    const setModal = useStore((state) => state.setModal);
    const soundEnabled = useStore((state) => state.deviceState.soundEnabled);
    const theme = useStore((state) => state.deviceState.theme);
    const setTheme = useStore((state) => state.setTheme);
    const setSoundEnabled = useStore((state) => state.setSoundEnabled);

    //Temp state before committing to global store.
    const [tempSound, setTempSound] = React.useState(soundEnabled);
    const [tempTheme, setTempTheme] = React.useState(theme);

    const isOpen = Boolean(open);
    const themeNames = Object.keys(themes);

    const handleClose = () => {
        setModal(null);
    };

    const handleSoundChange = (e) => {
        const toggleState = e.target.checked;
        setTempSound(toggleState);
    };

    const handleThemeChange = (e) => {
        const selected = e.target.value
        setTempTheme(selected)
    }

    const handleSave = () => {
        setSoundEnabled(tempSound);
        setTheme(tempTheme)
        handleClose();
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
                    Device Settings
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography>Theme</Typography>
                        <FormControl>
                            <Select size="small" onChange={handleThemeChange} value={tempTheme} sx={{ minWidth: 200 }}>
                                {themeNames.map((theme) => {
                                    return (
                                        <MenuItem value={theme} key={theme}>
                                            <Typography sx={{textTransform: "capitalize"}}>
                                                {theme}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography>Notification Sound</Typography>
                        <FormControl>
                            <Switch
                                checked={tempSound}
                                onChange={handleSoundChange}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
