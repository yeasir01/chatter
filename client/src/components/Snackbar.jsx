import React from "react";
import useStore from "../hooks/useStore.js";
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const anchorOrigin = {
  horizontal: "center",
  vertical: "top"
}

function Snackbar() {
    const [snackbar, setSnackbar] = useStore((state) => [
        state.snackbar,
        state.setSnackbar,
    ]);

    const handleClose = (event) => {
      setSnackbar({ open: false, message: "", severity: "" });
    };

    return (
      <MuiSnackbar anchorOrigin={anchorOrigin} open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={snackbar.severity} sx={{ borderRadius: 12}}>
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    );
}

export default Snackbar;
