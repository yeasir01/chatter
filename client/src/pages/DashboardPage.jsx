import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Box, Grow } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import CreateChatDialog from "../components/CreateChatDialog.jsx";
import DeviceSettingDialog from "../components/DeviceSettingDialog.jsx";
import ProfileDialog from "../components/ProfileDialog.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useStore from "../hooks/useStore.js"
import mp3File from "../assets/audio/sound-effect.mp3"
import NoConversationSelected from "../components/NoConversationSelected.jsx";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
    height: "100vh",
    maxHeight: "-webkit-fill-available",
    display:"flex",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2),
        gap: theme.spacing(2),
    },
}));

function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();
    const initSocket = useStore((state) => state.initSocket);
    const disconnect = useStore((state) => state.disconnect);
    
    const modal = useStore(state=> state.uiState.modal);
    const ui = useStore(state=> state.uiState.active);

    React.useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                initSocket(token);
            })
            .catch((err) => {
                console.log(err);
            });

        window.addEventListener("beforeunload", disconnect);
        
        return () => {
            window.removeEventListener("beforeunload", disconnect);
        };

    }, [disconnect, getAccessTokenSilently, initSocket]);

    return (
        <main>
            <StyledBox>
                <Box sx={{width: {xs: "100%", sm: 375 }, display: {xs: ui === "messages" ? "none": "block", sm: "block"}}}>
                    <Chats />
                </Box>
                <Box sx={{display: {xs: (ui === "messages" ? "block": "none"), sm: "block"}, flex: 1}}>
                    {ui === "chats" && <NoConversationSelected />}
                    {ui === "messages" && <MessagePanel />}
                </Box>
            </StyledBox>
            {modal === "create-chat" && <CreateChatDialog open={true} />}
            {modal === "settings" && <DeviceSettingDialog open={true} />}
            {modal === "profile" && <ProfileDialog open={true} />}
            <audio id="audio">
                <source src={mp3File} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </main>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
