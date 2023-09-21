import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined, Clear } from "@mui/icons-material";

function SearchTextField() {
    const [value, setValue] = React.useState("");
    const hasValue = Boolean(value);

    return (
        <div>
            <TextField
                fullWidth
                size="small"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "search" }}
                placeholder="Search..."
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
