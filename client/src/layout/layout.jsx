import { styled } from "@mui/system";
import { Paper, Container } from "@mui/material";

const FlexCenterContainer = styled(Container)(({ theme }) => ({
    height: "100%",
    maxHeight: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
}));

const LayoutContainer = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxHeight: "-webkit-fill-available",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]:{
        borderRadius: 0,
        border: 0,
    }
}));

const LayoutHeader = styled("header")(({ theme }) => ({
    flexGrow: 0,
}));

const LayoutContent = styled("main")(({ theme }) => ({
    flexGrow: 1,
    overflowY: "auto",
}));

const LayoutFooter = styled("footer")(({ theme }) => ({
    flexGrow: 0,
}));

export {
    LayoutContainer,
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
    FlexCenterContainer
}