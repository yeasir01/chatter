import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {

    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate((appState && appState.returnTo) || window.location.pathname)
    }

    const config = {
        domain: "yeasirhugais.us.auth0.com",
        clientId: "dcO9KfwgIkVymCZIzpfJnTtAD69SHWE8",
        authorizationParams: {
            redirect_uri: window.location.origin + "/dashboard",
            audience: "https://www.chatter.yeasirhugais.com/api",
        },
        onRedirectCallback
    };

    return <Auth0Provider {...config}>{children}</Auth0Provider>;
}

export {AuthProvider};
