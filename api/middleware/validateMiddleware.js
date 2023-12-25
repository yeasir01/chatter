import { ObjectSchema } from "yup";

/**
 * Express middleware for validating request data using Yup schema.
 *
 * @param {ObjectSchema<object>} schema - Yup schema object for validation.
 * @throws {ValidationError} - If validation fails, an error of type Yup.ValidationError is thrown.
 *
 * @example
 * // Importing and using the middleware in an Express route:
 * import express from "express";;
 * import validationSchema from '../validations/userValidation';
 * import controller from '../controller/someController';
 *
 * const router = express.Router();
 *
 * // Using the validate middleware to validate request data
 * router.post('/register', validate(validationSchema), controller);
 *
 *
 */
const validate = (schema) => async (req, _res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (err) {
        next(err);
    }
};

export default validate;
