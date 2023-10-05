const wrap = (middleware) => (socket, next) => middleware(socket, {}, next);

export default wrap;
