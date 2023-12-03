import { styled } from "@mui/system";

const LayoutContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    height: "100%",
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius + 8,
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