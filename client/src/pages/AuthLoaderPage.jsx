import React from 'react';
import Loader from "../components/Loader";
import { Box } from "@mui/material";

const styles = {
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}

function AuthLoaderPage() {
  return (
    <Box component="main"sx={styles.root}>
        <Loader message="Authenticating..." />
    </Box>
  )
}

export default AuthLoaderPage