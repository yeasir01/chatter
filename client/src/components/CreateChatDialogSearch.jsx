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
                    placeholder="Search for people..."
                    value={input}
                    onChange={handleChange}
                    autoComplete="off"
                    clear={handleClear}
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
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={
                                                person.firstName +
                                                " " +
                                                person.lastName
                                            }
                                            src={person.picture}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={labelId}
                                        primary={`${person.firstName} ${person.lastName}`}
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
