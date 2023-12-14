import React from "react";
import { Badge, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
      }
}));

function AvatarWithBadge({alt, src, online, size, group}) {
    return (
        <StyledBadge
            overlap="circular"
            color="success"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            variant="dot"
            invisible={online ? false : true}
        >
            <Avatar alt={alt} src={src} sx={{height:size, width: size}}>
                {group ? <GroupsIcon/> : <PersonIcon/>}
            </Avatar>
        </StyledBadge>
    );
}

AvatarWithBadge.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    online: PropTypes.bool,
    size: PropTypes.any,
    group: PropTypes.bool
}

AvatarWithBadge.defaultProps = {
    online: false
}

export default AvatarWithBadge;
