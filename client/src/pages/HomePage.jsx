import React from "react";
import AuthButtons from "../components/AuthButtons";
import iphoneImg from "../assets/img/phone.png";
import Copyright from "../components/Copyright";
import Logo from "../components/Logo";
import {
    Grid,
    Box,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Button,
} from "@mui/material";

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
        fontSize: "1.8em"
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
    }
};

function HomePage() {
    return (
        <Box sx={styles.root}>
            <AppBar position="static" color="default" elevation={0} >
                <Toolbar>
                    <Logo sx={styles.logo} />
                    <AuthButtons disableElevation variant="outlined" sx={styles.button}/>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={styles.main}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={styles.leftGrid}>
                        <Box component="img" src={iphoneImg} alt="iphone" sx={styles.img} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={styles.rightGrid}>
                        <Box sx={{ textAlign: {xs: "center",sm: "left"} }}>
                            <Typography color="text.primary" variant="h4">
                                Chat. Connect. Repeat.
                            </Typography>
                            <Typography color="text.secondary" variant="body1" gutterBottom >
                                Instantaneous communication and effective chats
                                to increase customers confidence!
                            </Typography>
                            <br />
                            <Button disableElevation size="large" variant="contained">Get Started</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container component="footer">
                <Copyright />
            </Container>
        </Box>
    );
}

export default HomePage;
