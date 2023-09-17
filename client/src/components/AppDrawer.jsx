import React from 'react';
import { Paper } from "@mui/material";
import AppDrawerMenu from './AppDrawerMenu';

function AppDrawer() {
  return (
    <Paper sx={{height: "100%", padding: 1, borderRadius: 0}}>
        <AppDrawerMenu sx={{display: "flex", flexDirection: "column"}} />
    </Paper>
  )
}

export default AppDrawer