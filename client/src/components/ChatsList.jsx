import * as React from "react";
import List from "@mui/material/List";
import ChatsListItem from "./ChatsListItem";

const mock__data = [
    {
        name: "Some Really Long Name Goes Here",
        lastMsg:
            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        picture: "https://i.pravatar.cc/300?img=3",
        online: true,
        time: "02:50 PM",
    },
    {
        name: "Random Guy",
        lastMsg:
            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        picture: "https://i.pravatar.cc/300?img=4",
        online: false,
        time: "02:50 PM",
    },
    {
        name: "Random Guy",
        lastMsg:
            "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        picture: "https://i.pravatar.cc/300?img=5",
        online: true,
        time: "02:50 PM",
    },
];

const useSX = () => ({
    list: {
        width: "100%",
        bgcolor: "background.paper",
        pl:2
    },
});

export default function ChatsList() {
    const styles = useSX();

    return (
        <List component="nav" sx={styles.list}>
            {mock__data.map((person, idx) => (
                <React.Fragment key={idx}>
                    <ChatsListItem
                        selected={idx === 0 ? true : false}
                        name={person.name}
                        src={person.picture}
                        msg={person.lastMsg}
                        time={person.time}
                    />
                </React.Fragment>
            ))}
        </List>
    );
}
