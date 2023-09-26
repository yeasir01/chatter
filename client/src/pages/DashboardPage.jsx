import React from "react";
import { withAuthenticationRequired} from "@auth0/auth0-react";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
import { Grid } from "@mui/material";
import { SocketProvider } from "../context/SocketContext.jsx";
import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx";

function Dashboard() {

    return (
        <SocketProvider>
            <Grid container padding={2} spacing={2} sx={{ height: "100vh" }}>
                <Grid item sx={{ width: 350 }}>
                    <Chats />
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                    <MessagePanel />
                </Grid>
            </Grid>
        </SocketProvider>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <AuthLoaderPage />,
});
