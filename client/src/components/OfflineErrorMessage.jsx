import React from "react";
import { Typography, Box } from "@mui/material";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import PropTypes from "prop-types";
import FlexCenterContainer from "../layout/flexCenterContainer";

function OfflineErrorMessage(props) {
    return (
        <FlexCenterContainer>
            <Box>
                <CloudOffOutlinedIcon color="disabled" sx={{ height: "2rem", width: "2rem" }} />
                <Typography variant="subtitle1">{props.title}</Typography>
                <Typography color={"text.secondary"} variant="body2">
                    {props.message}
                </Typography>
            </Box>
        </FlexCenterContainer>
    );
}

OfflineErrorMessage.defaultProps = {
    title: "HTTP Network Error",
    message: "Oops, something went wrong. Please try refreshing the page.",
};

OfflineErrorMessage.prototype = {
    title: PropTypes.string,
    message: PropTypes.string,
};

export default OfflineErrorMessage;
