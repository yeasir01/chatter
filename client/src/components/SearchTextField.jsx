import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined, Clear } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
/*     background: theme.palette.action.selected,
    "& .Mui-focused": {
        background: theme.palette.action.hover,
    },
    "& fieldset": { 
        borderColor: theme.palette.divider,
        borderRadius: 6
    } */
}));

function SearchTextField({placeholder="Search...", value, ...rest}) {
    const hasValue = Boolean(value);

    return (
        <div>
            <StyledTextField
                {...rest}
                fullWidth
                size="small"
                inputProps={{ "aria-label": "search" }}
                placeholder={placeholder}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                    ),
                    endAdornment: hasValue && (
                        <InputAdornment position="end">
                            <IconButton size="small">
                                <Clear fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    );
}

export default SearchTextField;
