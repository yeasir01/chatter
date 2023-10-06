/**
 * Formats a response object with a consistent structure.
 *
 * @param {*} data - The data to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response. Default is 200.
 * @param {string} [message="success"] - A message describing the response. Default is "success".
 * @returns {object} The formatted response object.
 * @throws {TypeError} If the `statusCode` is not a number.
 *
 * @example
 * const response = formatResponse({ someData: 'value' }, 200, 'Custom success message');
 * // Returns:
 * // {
 * //   statusCode: 200,
 * //   results: { someData: 'value' },
 * //   message: 'Custom success message',
 * //   success: true
 * // }
 */
const formatResponse = (data, statusCode = 200, message = "success") => {
    if (typeof statusCode !== "number") {
        throw new TypeError("The statusCode must be a number.");
    }

    if (typeof message !== "string") {
        throw new TypeError("The message must be a string.");
    }

    return {
        statusCode: statusCode,
        results: data,
        message: message,
        success: statusCode < 400,
    };
};

export default formatResponse;
