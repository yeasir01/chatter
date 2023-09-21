import React from "react";
import { Outlet, Link } from "react-router-dom";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import AuthButtons from "../components/AuthButtons";
import AuthLoaderPage from "./AuthLoaderPage.jsx";
//import { io } from "socket.io-client";
import { Container, Grid } from "@mui/material";

import Chats from "../components/Chats.jsx";
import MessagePanel from "../components/MessagePanel.jsx"
//let socket;

function Dashboard() {
/*     const { getAccessTokenSilently } = useAuth0();

    React.useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                socket = io("http://localhost:3000/", { auth: {token: `Bearer ${token}`} });

            } catch (error) {
                console.log(error);
            }
        })();
        
        return () => {
            socket.removeAllListeners();
        };
    }, [getAccessTokenSilently]); */

    return (
        <Grid container padding={2} spacing={2} sx={{height: "100vh"}}>
            <Grid item sx={{width: 350}}>
                <Chats />
            </Grid>
            <Grid item sx={{flexGrow: 1}}>
                <MessagePanel/>
            </Grid>
        </Grid>
        );
    }
    
    export default withAuthenticationRequired(Dashboard, {
        onRedirecting: () => <AuthLoaderPage />,
    });