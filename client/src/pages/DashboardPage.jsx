import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Grid } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useSocketStore from "../stores/useSocketStore.js";

function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();
    const initSocket = useSocketStore((state) => state.initSocket);
    const disconnect = useSocketStore((state) => state.disconnect);
    const sendMessage = useSocketStore((state) => state.sendMessage);

    React.useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                initSocket(token);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            disconnect();
        };
    }, [disconnect, getAccessTokenSilently, initSocket]);

    const send = () => {
        sendMessage({ content: "hello World" });
    };

    return (
        <Grid container padding={2} spacing={2} sx={{ height: "100vh" }}>
            <Grid item sx={{ width: 350 }}>
                <Chats />
                <button onClick={send}>Click</button>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
                <MessagePanel />
            </Grid>
        </Grid>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
