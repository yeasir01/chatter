import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Test() {
    const [state, setState] = React.useState("");
    const { getAccessTokenSilently } = useAuth0();

    React.useEffect(() => {
        const callAPI = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch("/api/v1/health/private", {
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

    return <pre>{JSON.stringify(state, null, 2)}</pre>;
}

export default Test;
