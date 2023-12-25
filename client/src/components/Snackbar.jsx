import React from "react";
import useStore from "../hooks/useStore.js";
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snackbar() {
    const [snackbar, setSnackbar] = useStore((state) => [
        state.snackbar,
        state.setSnackbar,
    ]);

    const handleClose = (event) => {
      setSnackbar({ open: false, message: "", severity: "" });
    };

    return (
      <MuiSnackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    );
}

export default Snackbar;
