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
    const [url, setUrl] = React.useState(apiUrl);
    const [options, setOptions] = React.useState(fetchOptions);

    const [response, setResponse] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const { getAccessTokenSilently } = useAuth0();

    const abortControllerRef = React.useRef(new AbortController())
    
    const handleFetch = React.useCallback(
        async (url = "", options = {}) => {
            try {
                setIsLoading(true);
                setError(null);
                
                const token = await getAccessTokenSilently();
                
                // Add access to token to request headers
                options.headers = {
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                };

                options.signal = abortControllerRef.current.signal;

                const request = await fetch(url, options);

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
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [getAccessTokenSilently]
    );

    /**
     * A custom react method for recalling the API request.
     *
     * @param {String} url - The URL of the API to fetch data from.
     * @param {Object} options - The options to configure the fetch request (e.g., headers).
     *
     */
    const reFetch = (url, options) => {
        setUrl(url || apiUrl);
        setOptions(options || fetchOptions);
    };

    React.useEffect(() => {
        const controller = abortControllerRef.current;

        if (url) {
            handleFetch(url, options).then((res) => {
                setResponse(res);
            });
        }

        return () => {
            controller.abort("Fetch aborted on unmount.")
        }
    }, [handleFetch, options, url]);

    return { response, isLoading, error, handleFetch, reFetch };
}

export default useFetch;
