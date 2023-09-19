import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

function SearchTextField() {
    return (
        <div>
            <TextField
                fullWidth
                size="small"
                inputProps={{ "aria-label": "search" }}
                placeholder="Search..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default SearchTextField;
