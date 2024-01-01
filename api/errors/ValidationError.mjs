/**
 * A custom error class for validation errors.
 *
 * @class ValidationError
 * @extends {Error}
 * @param {string} message - A description of the validation error.
 * @param {string} field - The name of the field that failed validation.
 * @param {any} value - The value that caused the validation error.
 */
class ValidationError extends Error {
    constructor(message, field, value) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
        this.status = 400; // Bad Request
    }
}

export default ValidationError;