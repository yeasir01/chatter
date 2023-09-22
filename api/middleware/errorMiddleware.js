//Express middleware
export const errorHandler = (err, req, res, next) => {
    res.status(err.status).send({ status: err.status, message: err.message });
    console.error(err);
}
