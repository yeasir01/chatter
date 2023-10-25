import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AvatarPhotoUpload from "../components/AvatarPhotoUpload";

function Test() {
    const [state, setState] = React.useState("");
    const { getAccessTokenSilently } = useAuth0();

    React.useEffect(() => {
        const callAPI = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch("/api/v1/chat/chats", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setState(data);
            } catch (error) {
                console.log(error);
                setState(error);
            }
        };

        callAPI();
    }, [getAccessTokenSilently]);

    return (
        <>
            <AvatarPhotoUpload/>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    );

}

export default Test;
