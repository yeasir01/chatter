import React from 'react';
import { Chip, Grow, Box } from "@mui/material";

function InlineBadge({count, ...rest}) {

    const display = count > 99 ? "99+" : count;
    
    const open = Boolean(count)

    return (
        <Box>
            <Grow in={open} timeout={300}>
                <Chip {...rest} label={display} size="small" />
            </Grow>
        </Box>
  )
}

export default InlineBadge