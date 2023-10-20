import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * A custom react hook for making authenticated API requests using the Auth0 authentication library.
 *
 * @param {*} initialState - The initial state for the response data.
 * @param {String} apiUrl - The URL of the API to fetch data from.
 * @param {Object} fetchOptions - The options to configure the fetch request (e.g., headers).
 * @returns {{
 *   response: *, // The fetched data
 *   isLoading: boolean, // Indicates if the request is in progress
 *   error: Error | null, // Any error that occurred during the request
 *   handleFetch: function, // Function to trigger the API request
 * }}
 */
function useFetch(apiUrl = "", initialState = null, fetchOptions = {}) {
    const [response, setResponse] = React.useState(initialState);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const handleFetch = React.useCallback(
        async (url = "", options = {}, callback) => {
            try {
                setResponse(initialState);
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

                const data = await request.json();
                setResponse(data);

                if (typeof callback === "function") {
                    callback();
                }
            } catch (error) {
                console.error(error); // Log the error for debugging
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [initialState, getAccessTokenSilently]
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
