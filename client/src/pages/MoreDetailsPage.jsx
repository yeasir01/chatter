import React from "react";
import { FlexCenterContainer } from "../layout/layout.jsx";
import { Paper, Typography, Box, TextField, Button, Link } from "@mui/material";
import useFetch from "../hooks/useFetch.js";
import useStore from "../hooks/useStore.js";
import Loader from "../components/Loader.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import OfflineErrorMessage from "../components/OfflineErrorMessage.jsx";
import { moreDetailsSchema, validateField } from "../validators/yupValidationSchema.js";

const MoreDetailsPage = ({ children }) => {
    const { handleFetch, loading, error } = useFetch({
        initialLoadingState: true,
    });
    const setUser = useStore((state) => state.setUser);
    const user = useStore((state) => state.user);
    const [state, setState] = React.useState({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
    });

    const [formErrors, setFormErrors] = React.useState({
        firstName: "",
        lastName: "",
        username: "",
    });

    const { logout } = useAuth0();

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await handleFetch("/api/v1/user/profile");
                setUser(user);
                setState(user);
            } catch (err) {
                console.log("fetchProfile", err);
            }
        };

        fetchProfile();
    }, [handleFetch, setUser]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();

            for (const key in state) {
                formData.append(key, state[key]);
            }

            const opt = {
                method: "PATCH",
                body: formData,
            };

            const user = await handleFetch("/api/v1/user/profile", opt);
            setUser(user);
        } catch (err) {
            console.log("handleSubmit", err);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(moreDetailsSchema, setFormErrors, name, value);
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
                <OfflineErrorMessage message={error} />
            </FlexCenterContainer>
        );
    }

    if (!user.firstName || !user.lastName || !user.username) {
        return (
            <FlexCenterContainer
                sx={{ height: "100vh"}}
                component="main"
                maxWidth="xs"
            >
                <Paper sx={{ px: 5, py: 3 }} variant="outlined">
                    <Box sx={{py: 1}}>
                        <Typography align="left" component="h1" variant="h4">
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
                            value={state.firstName}
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
                            value={state.lastName}
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
                            value={state.username}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, py: 1, borderRadius: 12}}
                        >
                            Continue
                        </Button>
                    </Box>
                    <Box>
                        <Typography component={"span"}>
                            {"Changed your mind? "}
                        </Typography>
                        <Typography color="primary" component={"span"} sx={{cursor: "pointer"}}
                            onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }>
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
