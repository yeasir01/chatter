import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, IconButton, Badge, Box } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const LargeAvatar = styled(Avatar)(({ theme, size }) => ({
    width: size,
    height: size,
    fontSize: Number(size) / 3,
    border: `medium solid ${theme.palette.divider}`,
}));

const StyledBox = styled(Box)(({ theme, size }) => ({
    width: size,
    height: size,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[3],
    background: theme.palette.background.paper,
    borderRadius: "50%",
    padding: theme.spacing(0.25),
    fontSize: size / 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    "&:hover .inner-badge": {
        color: theme.palette.primary.main,
    },
}));

function AvatarPhotoUpload({size = 80, src, children, alt, onChange, name , ...props}) {

    const badgeSize = size / 3.5;
    const inputRef = React.useRef(null);

    const handleClick = () => {
        inputRef.current.click()
    }
    
    return (
        <StyledIconButton onClick={handleClick} {...props}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                    <StyledBox className="inner-badge" size={badgeSize}>
                        {src ? <ModeEditOutlineOutlinedIcon fontSize="inherit"/> : <AddOutlinedIcon fontSize="inherit"/>}
                    </StyledBox >
                }
            >
                <LargeAvatar size={size} alt={alt} src={src} >
                    <Box sx={{pt: 0.75, pl: 0.25, color: "white"}}>
                        <LandscapeOutlinedIcon fontSize={"inherit"}/>
                    </Box>
                </LargeAvatar>
            </Badge>
            <input 
                style={{display: "none"}} 
                name={name} 
                ref={inputRef} 
                onChange={onChange} 
                type="file" 
                accept="image/jpeg, image/png, image/gif, image/webp"
            />
        </StyledIconButton>
    );
}

export default AvatarPhotoUpload;
