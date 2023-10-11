import React from "react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Grid } from "@mui/material";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import CreateChatModal from "../components/CreateChatModal.jsx";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import useStore from "../hooks/useStore.js"

function Dashboard() {
    const { getAccessTokenSilently, user } = useAuth0();
    const initSocket = useStore((state) => state.initSocket);
    const disconnect = useStore((state) => state.disconnect);
    const createChat = useStore((state) => state.createChat);
    const setUser = useStore((state) => state.setUser);
    const ui = useStore(state=> state.uiState.active);
    //const sendMessage = useStore((state) => state.sendMessage);
    //const messages = useStore((state) => state.messages);

    React.useEffect(() => {
        setUser(user.sub)
        
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
    }, [disconnect, getAccessTokenSilently, initSocket, setUser, user.sub]);

    const send = () => {
        //sendMessage({ content: "hello World" });
        createChat({
            name: "Api Team",
            group: true,
            participants: ["auth0|64f6cf401af55a38ae6f410f", "auth0|65149dc150dd72103eb6fd76"]
        })
    };

    return (
        <Grid container padding={2} spacing={2} sx={{ height: "100vh" }}>
            <Grid item sx={{ width: 350 }}>
                {ui === "chat:create" && <CreateChatModal open={true} />}
                <CreateChatModal />
                <Chats />
                <button onClick={send}>Click</button>
            </Grid>
            <Grid item sx={{ flexGrow: 1, height: "100%" }}>
                <MessagePanel />
            </Grid>
        </Grid>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
