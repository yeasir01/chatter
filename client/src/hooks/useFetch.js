import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * A custom react hook for making authenticated API requests using the Auth0 authentication library.
 *
 * @param {String} apiUrl - The URL of the API to fetch data from.
 * @param {Object} fetchOptions - The options to configure the fetch request (e.g., headers).
 * @returns {{
 *   response: *, // The fetched data
 *   isLoading: boolean, // Indicates if the request is in progress
 *   error: Error | null, // Any error that occurred during the request
 *   handleFetch: function, // Function to trigger the API request
 * }}
 */
function useFetch(apiUrl = "", fetchOptions = {}) {
    const [response, setResponse] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const handleFetch = React.useCallback(
        async (url = "", options = {}) => {
            try {
                setResponse(null)
                setIsLoading(true);
                setError(null);
                const token = await getAccessTokenSilently();

                // Add access to token to request headers
                options.headers = {
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                };

                const request = await fetch(url, options);

                if (!request.ok) {
                    throw new Error(
                        `HTTP request failed with status code ${request.status}. ${request.statusText}`
                    );
                }

                if (request.status === 204){
                    return
                }

                const data = await request.json();
                setResponse(data);
            } catch (error) {
                console.error(error.message); // Log the error for debugging
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [getAccessTokenSilently]
    );

    React.useEffect(() => {
        if (apiUrl) {
            handleFetch(apiUrl, fetchOptions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { response, isLoading, error, handleFetch };
}

export default useFetch;
