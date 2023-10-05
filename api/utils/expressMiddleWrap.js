/**
 * Wraps an Express middleware function to make it compatible with Socket.IO.
 *
 * @param {function} middleware - The Express middleware function to wrap.
 * @returns {function} Returns a wrapped middleware function compatible with Socket.IO.
 *
 * @example
 * // Usage:
 * const wrappedMiddleware = wrap(myMiddleware);
 *
 * // Apply the wrapped middleware to a Socket.IO server
 * io.use(wrappedMiddleware);
 */
const wrap = (middleware) => (socket, next) => middleware(socket, {}, next);

export default wrap;
