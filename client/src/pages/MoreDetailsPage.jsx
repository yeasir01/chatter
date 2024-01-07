import React from "react";
import { FlexCenterContainer } from "../layout/layout.jsx";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import useFetch from "../hooks/useFetch.js";
import useStore from "../hooks/useStore.js";
import Loader from "../components/Loader.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import OfflineErrorMessage from "../components/OfflineErrorMessage.jsx";
import {
    moreDetailsSchema,
    validateField,
    validate,
} from "../validators/yupValidationSchema.js";

const MoreDetailsPage = ({ children }) => {
    const [user, setUser] = useStore((state) => [state.user, state.setUser]);
    const setSnackbar = useStore((state) => state.setSnackbar);
    const [state, setState] = React.useState({ ...user });
    const [formErrors, setFormErrors] = React.useState({ ...user });

    const { handleFetch, loading, error } = useFetch({
        initialLoadingState: true,
    });

    const { logout } = useAuth0();

    React.useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const user = await handleFetch("/api/v1/user/profile");
                setState(user);
                setUser(user);
            } catch (err) {
                console.log("fetchProfileError", err);
            }
        };

        fetchProfileData();
    }, [handleFetch, setUser]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await validate(moreDetailsSchema, state);
            const formData = new FormData();

            for (const key in state) {
                formData.append(key, state[key]);
            }

            const opt = {
                method: "PATCH",
                body: formData,
            };

            const user = await handleFetch(
                "/api/v1/user/profile?activate=true",
                opt
            );
            setUser(user);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message,
                severity: "error",
            });
            console.log("handleSubmit", err);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        await validateField(moreDetailsSchema, setFormErrors, name, value);
    };

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    if (loading) {
        return (
            <FlexCenterContainer
                sx={{ height: "100vh" }}
                component="main"
                maxWidth="xs"
            >
                <Loader message="Loading profile..." />
            </FlexCenterContainer>
        );
    }

    if (error) {
        return (
            <FlexCenterContainer
                sx={{ height: "100vh" }}
                component="main"
                maxWidth="xs"
            >
                <OfflineErrorMessage message={error.message} />
            </FlexCenterContainer>
        );
    }

    if (!user.active) {
        return (
            <FlexCenterContainer
                sx={{ height: "100vh" }}
                component="main"
                maxWidth="xs"
            >
                <Paper sx={{ px: 5, py: 3 }} variant="outlined">
                    <Box sx={{ py: 1 }}>
                        <Typography
                            sx={{ fontWeight: "bold" }}
                            gutterBottom
                            align="left"
                            component="h1"
                            variant="h4"
                        >
                            Almost there...
                        </Typography>
                        <Typography align="left" variant="body2">
                            We need some basic info to help others find you.
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            onBlur={handleBlur}
                            error={Boolean(formErrors.firstName)}
                            helperText={formErrors.firstName}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            value={state.firstName || ""}
                            onChange={handleChange}
                        />
                        <TextField
                            onBlur={handleBlur}
                            error={Boolean(formErrors.lastName)}
                            helperText={formErrors.lastName}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={state.lastName || ""}
                            onChange={handleChange}
                        />
                        <TextField
                            onBlur={handleBlur}
                            error={Boolean(formErrors.username)}
                            helperText={formErrors.username}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            id="username"
                            label="Username"
                            name="username"
                            value={state.username || ""}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, py: 1.2, borderRadius: 12 }}
                        >
                            Start Chatting!
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="body2" component={"span"}>
                            {"Not the right time? "}
                        </Typography>
                        <Typography
                            color="primary"
                            variant="body2"
                            component={"span"}
                            sx={{ cursor: "pointer" }}
                            onClick={handleLogout}
                        >
                            Logout.
                        </Typography>
                    </Box>
                </Paper>
            </FlexCenterContainer>
        );
    }

    return children;
};

export default MoreDetailsPage;
