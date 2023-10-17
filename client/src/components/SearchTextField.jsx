import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined, Clear } from "@mui/icons-material";

function SearchTextField({placeholder="Search...", value, setValue, ...rest}) {
    const hasValue = Boolean(value);

    return (
        <div>
            <TextField
                {...rest}
                fullWidth
                size="small"
                value={value}
                onInput={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "search" }}
                placeholder={placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                    ),
                    endAdornment: hasValue && (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={()=>setValue("")}>
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
