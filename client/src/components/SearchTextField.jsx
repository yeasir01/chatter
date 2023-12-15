import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined, Clear } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiTextField-root": {
        //padding: 0,
        //background:theme.palette.action.hover,
    },
    "& fieldset": {
        //padding: 0
    },
    "& .Mui-focused": {
        //background: theme.palette.action.active,
    },
}));

function SearchTextField({placeholder="Search...", onClear ,value, ...rest}) {
    const hasValue = Boolean(value);

    return (
        <div>
            <StyledTextField
                {...rest}
                fullWidth
                size="small"
                inputProps={{ "aria-label": "search people" }}
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
                            <IconButton size="small" onClick={onClear}>
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
