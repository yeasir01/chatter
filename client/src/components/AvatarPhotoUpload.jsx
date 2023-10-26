import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, IconButton, Badge } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const LargeAvatar = styled(Avatar)(({ theme, size }) => ({
    width: size,
    height: size,
    fontSize: size / 3,
    border: `2px solid ${theme.palette.background.paper}`,
}));

const StyledIcon = styled(ModeEditOutlineOutlinedIcon)(({ theme, size }) => ({
    width: size,
    height: size,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[3],
    background: theme.palette.background.paper,
    borderRadius: "50%",
    padding: theme.spacing(0.25),
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
                    <StyledIcon className={"inner-badge"} size={badgeSize} />
                }
            >
                <LargeAvatar size={size} alt={alt} src={src} >
                    {children}
                </LargeAvatar>
            </Badge>
            <input 
                style={{display: "none"}} 
                name={name} ref={inputRef} 
                onChange={onChange} 
                type="file" 
                accept="image/jpeg, image/png, image/gif, image/webp"
            />
        </StyledIconButton>
    );
}

export default AvatarPhotoUpload;
