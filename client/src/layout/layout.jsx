import { styled } from "@mui/system";

const ParentDiv = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderColor: theme.palette.divider,
    boxSizing: "border-box",
    height: "100%",
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
}));

const Header = styled('header')(({ theme }) => ({
    flex: 0,
}));

const Content = styled('main')(({ theme }) => ({
    flex: 1,
    overflow: "auto",
}));

const Footer = styled('footer')(({ theme }) => ({
    flex: 0,
}));

export {
    ParentDiv,
    Header,
    Content,
    Footer
}