import React from "react";
import {
    Box,
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    CircularProgress,
    Avatar
} from "@mui/material";
import SearchTextField from "./SearchTextField.jsx";
import getParticipantFullName from "../utils/nameFormat.js";

function CreateChatDialogSearch({onSubmit, loading, users, handleToggle, checkList}) {
    const [input, setInput] = React.useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
    };

    const handleClear = (e) => {
        setInput("")
        onSubmit(e, "")
    }

    return (
        <>
            <Box component={"form"} onSubmit={(e)=> onSubmit(e, input)}>
                <SearchTextField
                    placeholder="Search by name"
                    value={input}
                    onChange={handleChange}
                    onClear={handleClear}
                    autoComplete="off"
                />
            </Box>
            <List sx={{ width: "100%" }}>
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            p: 2,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    users.map((person) => {
                        const labelId = `checkbox-list-secondary-label-${person.id}`;
                        const fullName = getParticipantFullName(person)
                        return (
                            <ListItem
                                divider
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
                                <ListItemButton onClick={handleToggle(person.id)}>
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
