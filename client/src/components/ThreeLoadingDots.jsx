import React from "react";
import { Stack} from "@mui/material";
import { styled } from "@mui/material/styles";

const Dot = styled("span")(({ theme }) => ({
    width: 9,
    height: 9,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
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

const ThreeLoadingDots = () => {
    return (
        <Stack direction="row" gap={1} sx={{height: "100%", alignItems: "center"}}>
            <Dot sx={{animationDelay: "0s"}}></Dot>
            <Dot sx={{animationDelay: "0.5s"}}></Dot>
            <Dot sx={{animationDelay: "1s"}}></Dot>
        </Stack>
    );
};

export default ThreeLoadingDots;
