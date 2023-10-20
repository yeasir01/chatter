import React from "react";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import ChatsList from "./ChatsList.jsx";
import SearchTextField from "./SearchTextField.jsx";
import useStore from "../hooks/useStore.js";

const useSX = () => ({
    paper: {
        width: 375,
    },
    container: {
        height: 600,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 0,
    },
    title: {
        fontWeight: 700,
    },
    search: {
        p: 2,
    },
});

function Chats() {
    const styles = useSX();
    const updateUi = useStore((state) => state.updateUi);
    const chats = useStore((state) => state.chats);
    const [state, setState] = React.useState({
        searchTerm: "",
        searchResults: [],
    });

    const openCreateChatModel = () => {
        updateUi("chat:create");
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        
        if (searchTerm === "") {
            setState({ searchTerm: "", searchResults: [] });
        } else {
            const filteredResults = chats.filter((chat) => {
                if (
                    chat.group &&
                    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return true; // Match for group names
                }

                if (!chat.group) {
                    const participantsMatch = chat.participants.some(
                        (participant) => {
                            const fullName = `${participant.firstName} ${participant.lastName}`;
                            return fullName
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase());
                        }
                    );

                    if (participantsMatch) {
                        return true; // Match for participant names
                    }
                }

                return false;
            });

            setState({ searchTerm, searchResults: filteredResults });
        }
    };

    return (
        <Paper variant="outlined" sx={styles.paper}>
            <Grid container direction="column" sx={styles.container}>
                <Grid item sx={{ pt: 1.5 }}>
                    <Box sx={styles.header}>
                        <AvatarWithMenu />
                        <Typography sx={styles.title} variant="h5">
                            Chats
                        </Typography>
                        <IconButton onClick={openCreateChatModel}>
                            <AddOutlinedIcon color="primary" />
                        </IconButton>
                    </Box>
                    <Box sx={styles.search}>
                        <SearchTextField
                            onChange={handleSearch}
                            name="conversation-search"
                        />
                    </Box>
                </Grid>
                <Grid item flex={1}>
                    <ChatsList filteredList={state} chats={chats} />
                </Grid>
                <Grid item>
                    <div>Open for something here</div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Chats;
