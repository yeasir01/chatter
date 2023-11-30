import { styled } from "@mui/system";

const LayoutContainer = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderColor: theme.palette.divider,
    boxSizing: "border-box",
    height: "100%",
    background: theme.palette.background.paper,
    borderRadius: 20,
    overflow: "hidden"
}));

const LayoutHeader = styled('header')(({ theme }) => ({
    flex: 0,
}));

const LayoutContent = styled('main')(({ theme }) => ({
    flex: 1,
    overflow: "auto",
}));

const LayoutFooter = styled('footer')(({ theme }) => ({
    flex: 0,
}));

export {
    LayoutContainer,
    LayoutHeader,
    LayoutContent,
    LayoutFooter
}