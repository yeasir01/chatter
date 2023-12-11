import { styled } from "@mui/system";
import { Container } from "@mui/material";

const FlexCenterContainer = styled(Container)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
}));

export default FlexCenterContainer;