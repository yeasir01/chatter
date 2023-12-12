import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import ChatsList from "./ChatsList.jsx";
import SearchTextField from "./SearchTextField.jsx";
import useStore from "../hooks/useStore.js";
import { LayoutContainer, LayoutHeader, LayoutContent, LayoutFooter } from "../layout/layout.jsx";

const useSX = () => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        paddingBottom: 1
    },
    title: {
        fontWeight: 700,
    },
    search: {
        paddingX: 2,
        paddingBottom: 2,
    },
});

function Chats({...props}) {
    const styles = useSX();
    const setModal = useStore((state) => state.setModal);
    const chats = useStore((state) => state.chats);
    const [state, setState] = React.useState({
        searchTerm: "",
        searchResults: [],
    });

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
        <LayoutContainer {...props} variant="outlined">
            <LayoutHeader>
                <Box sx={styles.header}>
                    <AvatarWithMenu />
                    <Typography sx={styles.title} variant="h5">
                        Chats
                    </Typography>
                    <IconButton onClick={()=> setModal("create-chat")}>
                        <AddOutlinedIcon color="primary" />
                    </IconButton>
                </Box>
                <Box sx={styles.search}>
                    <SearchTextField
                        onChange={handleSearch}
                        name="conversation-search"
                        placeholder="Search by group name..."
                    />
                </Box>
            </LayoutHeader>
            <LayoutContent>
              <ChatsList filteredList={state} />
            </LayoutContent>
            <LayoutFooter>
                {/* empty */}
            </LayoutFooter>
        </LayoutContainer>
    );                                                                                                                
}

export default Chats;
