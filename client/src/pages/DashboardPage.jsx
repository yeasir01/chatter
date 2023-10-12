import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Grid } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import CreateChatModal from "../components/CreateChatModal.jsx";
import DeviceSettingDialog from "../components/DeviceSettingDialog.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useStore from "../hooks/useStore.js"
import mp3File from "../assets/audio/sound-effect.mp3"

function Dashboard() {
    const { getAccessTokenSilently, user } = useAuth0();
    const initSocket = useStore((state) => state.initSocket);
    const disconnect = useStore((state) => state.disconnect);
    const setUser = useStore((state) => state.setUser);
    
    const ui = useStore(state=> state.uiState.active);

    React.useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                initSocket(token);
                setUser(user.sub)
            })
            .catch((err) => {
                console.log(err);
            });

        window.addEventListener("beforeunload", disconnect);
        
        return () => {
            window.removeEventListener("beforeunload", disconnect);
            disconnect()
        };

    }, [disconnect, getAccessTokenSilently, initSocket, setUser, user.sub]);

    return (
        <Grid container padding={2} spacing={2} sx={{ height: "100vh" }}>
            {ui === "chat:create" && <CreateChatModal open={true} />}
            {ui === "settings" && <DeviceSettingDialog open={true} />}
            <Grid item sx={{ width: 350 }}>
                <Chats />
            </Grid>
            <Grid item sx={{ flexGrow: 1, height: "100%" }}>
                <MessagePanel />
            </Grid>
            <audio id="audio">
                <source src={mp3File} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </Grid>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
