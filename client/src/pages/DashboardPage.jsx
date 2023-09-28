import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Grid } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useStore from "../store/useStore.js";

function Dashboard() {
    const { getAccessTokenSilently } = useAuth0();
    const initSocket = useStore((state) => state.initSocket);
    const disconnect = useStore((state) => state.disconnect);
    const sendMessage = useStore((state) => state.sendMessage);
    const messages = useStore((state) => state.messages);

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

    const send = () => {
        sendMessage({ content: "hello World" });
    };

    console.log("messages:", messages);

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
