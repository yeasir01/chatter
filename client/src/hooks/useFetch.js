import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BASE } from "../utils/api";

function useFetch({ initialLoadingState = false } = {}) {
    const [loading, setLoading] = React.useState(initialLoadingState);
    const [error, setError] = React.useState(null);

    const { getAccessTokenSilently } = useAuth0();

    const abortControllerRef = React.useRef(new AbortController());

    const handleFetch = React.useCallback(
        async (path = "", options = {}) => {
            try {
                setLoading(true);
                setError(null);

                const token = await getAccessTokenSilently();

                options.signal = abortControllerRef.current.signal;

                // Add access token to request headers
                options.headers = {
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                };

                const request = await fetch(BASE + path, options);

                if (request.status === 204) {
                    return {
                        status: 204,
                        message: "Resource successfully updated.",
                    };
                }

                if (!request.ok) {
                    const error = await request.json();
                    throw error;
                }

                const data = await request.json();
                return data;
            } catch (err) {
                setError(err);
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
            controller.abort({message: "Signal was aborted on component unmount."});
        };
    }, []);

    return { handleFetch, loading, error };
}

export default useFetch;
