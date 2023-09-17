import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

function AuthButtons(props) {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Button {...props} disabled>Loading...</Button>;
    }

    if (isAuthenticated) {
        return (
            <Button
                {...props}
                onClick={() =>
                    logout({
                        logoutParams: { returnTo: window.location.origin },
                    })
                }
            >
                Log Out
            </Button>
        );
    } else {
        return <Button {...props} onClick={() => loginWithRedirect()}>Log In</Button>;
    }
}

export default AuthButtons;
