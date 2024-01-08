import React from "react";
import {
    Box,
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    Avatar,
} from "@mui/material";
import SearchTextField from "./SearchTextField.jsx";
import getParticipantFullName from "../utils/nameFormat.js";
import CircularLoader from "./CircularLoader.jsx";
import { useDebouncedCallback } from "use-debounce";

function CreateChatDialogSearch({
    onSubmit,
    loading,
    users,
    handleToggle,
    checkList,
}) {
    const [input, setInput] = React.useState("");

    const debounceApiCall = useDebouncedCallback(() => {
        onSubmit(input);
    }, 500);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        debounceApiCall();
    };

    const handleClear = (e) => {
        setInput("");
        onSubmit("");
    };

    return (
        <>
            <Box>
                <SearchTextField
                    placeholder="Search by name, email or username"
                    value={input}
                    onChange={handleChange}
                    onClear={handleClear}
                    autoComplete="off"
                    autoFocus
                />
            </Box>
            <List sx={{ width: "100%" }}>
                {loading ? (
                    <CircularLoader sx={{pt: 2}} />
                ) : (
                    users.map((person) => {
                        const labelId = `checkbox-list-secondary-label-${person.id}`;
                        const fullName = getParticipantFullName(person);
                        return (
                            <ListItem
                                divider={users.length > 1}
                                key={person.id}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(person.id)}
                                        checked={
                                            checkList.indexOf(person.id) !== -1
                                        }
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={handleToggle(person.id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={fullName}
                                            src={person.picture}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={labelId}
                                        primary={fullName}
                                        secondary={`@${person.username}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                )}
            </List>
        </>
    );
}

export default CreateChatDialogSearch;
