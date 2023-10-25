import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AvatarWithMenu from "./AvatarWithMenu.jsx";
import ChatsList from "./ChatsList.jsx";
import SearchTextField from "./SearchTextField.jsx";
import useStore from "../hooks/useStore.js";
import { ParentDiv, Header, Content, Footer } from "../layout/layout.jsx";

const useSX = () => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
    },
    title: {
        fontWeight: 700,
    },
    search: {
        px: 2,
        pb: 1,
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
        <ParentDiv>
            <Header>
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
                        placeholder="Search by group name..."
                    />
                </Box>
            </Header>
            <Content>
              <ChatsList filteredList={state} chats={chats} />
            </Content>
            <Footer>
                {/* Some footer item here */}
            </Footer>
        </ParentDiv>
    );
}

export default Chats;
