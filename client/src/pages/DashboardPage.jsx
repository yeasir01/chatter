import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Box } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import CreateChatDialog from "../components/CreateChatDialog.jsx";
import DeviceSettingDialog from "../components/DeviceSettingDialog.jsx";
import ProfileDialog from "../components/ProfileDialog.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useStore from "../hooks/useStore.js"
import mp3File from "../assets/audio/sound-effect.mp3"
import NoConversationSelected from "../components/NoConversationSelected.jsx";

function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();
    const initSocket = useStore((state) => state.initSocket);
    const disconnect = useStore((state) => state.disconnect);
    
    const modal = useStore(state=> state.uiState.modal);

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
            disconnect()
        };

    }, [disconnect, getAccessTokenSilently, initSocket]);

    return (
        <>
            <Box sx={{height: "100vh", padding: 2, gap: 2, display: "flex", flexDirection: "row"}}>
                <Box sx={{width: {xs: "100%", sm: 375}}}>
                    <Chats />
                </Box>
                <Box flex={1} sx={{display: {xs: "none", md: "block"}}}>
                    {/* <NoConversationSelected /> */}
                    {<MessagePanel />}
                </Box>
            </Box>
            {modal === "create-chat" && <CreateChatDialog open={true} />}
            {modal === "settings" && <DeviceSettingDialog open={true} />}
            {modal === "profile" && <ProfileDialog open={true} />}
            <audio id="audio">
                <source src={mp3File} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
