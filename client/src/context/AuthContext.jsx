import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {

    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate((appState && appState.returnTo) || window.location.pathname)
    }

    const config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        },
        onRedirectCallback
    };

    return <Auth0Provider {...config}>{children}</Auth0Provider>;
}

export {AuthProvider};
