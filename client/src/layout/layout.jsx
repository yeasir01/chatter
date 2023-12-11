import { styled } from "@mui/system";
import { Paper } from "@mui/material";

const LayoutContainer = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: theme.shape.borderRadius + 6,
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
    LayoutFooter
}