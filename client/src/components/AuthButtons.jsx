import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AuthButtons(props) {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Button {...props} disabled>
                Loading...
            </Button>
        );
    }

    if (isAuthenticated) {
        return (
            <Button
                {...props}
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Dashboard
            </Button>
        );
    }

    return (
        <Button {...props} onClick={() => loginWithRedirect()}>
            Log In
        </Button>
    );
}

export default AuthButtons;
