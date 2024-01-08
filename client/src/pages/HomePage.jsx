import React from "react";
import AuthButtons from "../components/AuthButtons";
import iphoneImg from "../assets/img/iphone_hero.webp";
import FooterAttribution from "../components/FooterAttribution.jsx";
import Logo from "../components/Logo";
import {
    Grid,
    Box,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Button,
    Link
} from "@mui/material";
import GithubIcon from "../components/GithubIcon.jsx";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    main: {
        flexGrow: 1,
    },
    logo: {
        flexGrow: 1,
        fontSize: "1.8em",
    },
    img: {
        height: 500,
        width: "auto",
    },
    leftGrid: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    rightGrid: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    button: {
        paddingX: 3,
    },
};

function HomePage() {
    return (
        <Box sx={styles.root}>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Logo sx={styles.logo} />
                    <AuthButtons
                        disableElevation
                        variant="outlined"
                        sx={styles.button}
                    />
                </Toolbar>
            </AppBar>
            <Container component="main" sx={styles.main}>
                <Grid container>
                    <Grid item xs={12} md={4} sx={styles.leftGrid}>
                        <Box
                            component="img"
                            src={iphoneImg}
                            alt="iphone"
                            sx={styles.img}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} sx={styles.rightGrid}>
                        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                            <Typography color="text.primary" variant="h3">
                                Chat. Connect. Repeat.
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body1"
                                gutterBottom
                            >
                                Experience seamless communication with our interactive chat app. Built with cutting-edge technologies, it combines a modern design with real-time functionality, ensuring an engaging and efficient user experience.
                            </Typography>
                            <br />
                            <Button
                                disableElevation
                                size="large"
                                variant="contained"
                                sx={{ gap: 1, fontSize: "1rem", textTransform:"none", borderRadius: 6, padding: ".5rem 1.5rem" }}
                                component={Link}
                                href="https://github.com/yeasir01/chatter"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <GithubIcon fontSize="inherit" />
                                Repository
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container component="footer">
                <FooterAttribution />
            </Container>
        </Box>
    );
}

export default HomePage;
