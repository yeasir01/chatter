import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined, Clear } from "@mui/icons-material";

function SearchTextField({placeholder="Search...", onClear ,value, ...rest}) {
    const hasValue = Boolean(value);

    return (
        <>
            <TextField
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
        </>
    );
}

export default SearchTextField;
