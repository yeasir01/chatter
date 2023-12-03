import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BASE_URL } from "../utils/api";

function useFetch() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const { getAccessTokenSilently } = useAuth0();

    const abortControllerRef = React.useRef(new AbortController());

    const handleFetch = React.useCallback(
        async (url = "", options = {}) => {
            try {
                setLoading(true);
                setError(null);

                const token = await getAccessTokenSilently();

                // Add access to token to request headers
                options.headers = {
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                };

                options.signal = abortControllerRef.current.signal;

                const request = await fetch(BASE_URL + url, options);

                if (!request.ok) {
                    throw new Error(
                        `HTTP request failed with status code ${request.status}. ${request.statusText}`
                    );
                }

                if (request.status === 204) {
                    return null;
                }

                const data = await request.json();
                return data;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [getAccessTokenSilently]
    );

    React.useEffect(() => {
        const controller = abortControllerRef.current;

        return () => {
            //controller.abort("Signal was aborted on component unmount.");
        };
    }, []);

    return { handleFetch, loading, error };
}

export default useFetch;
