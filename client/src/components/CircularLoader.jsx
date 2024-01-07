import React from "react";
import { FlexCenterContainer } from "../layout/layout.jsx";
import { CircularProgress } from "@mui/material";

function CircularLoader() {
    return (
        <FlexCenterContainer>
            <CircularProgress thickness={1} variant="indeterminate" size={"4rem"} />
        </FlexCenterContainer>
    );
}

export default CircularLoader;
