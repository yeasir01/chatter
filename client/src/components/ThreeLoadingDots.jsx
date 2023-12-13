import React from "react";
import { Stack} from "@mui/material";
import { styled } from "@mui/material/styles";

const Dot = styled("span")(({ theme, color }) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: color || theme.palette.primary.contrastText,
    animation: "animate 1s infinite linear alternate",
    "@keyframes animate": {
        "0%": {
            opacity: 0.5
        },
        "50%, 100%": {
            opacity: 1
        },
    },
}));

const ThreeLoadingDots = ({color}) => {
    return (
        <Stack direction="row" gap={1} sx={{height: "100%", alignItems: "center"}}>
            <Dot sx={{animationDelay: "0s", backgroundColor: color}}></Dot>
            <Dot sx={{animationDelay: "0.5s", backgroundColor: color}}></Dot>
            <Dot sx={{animationDelay: "1s", backgroundColor: color}}></Dot>
        </Stack>
    );
};

export default ThreeLoadingDots;
