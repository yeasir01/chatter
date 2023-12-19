import * as yup from "yup";

const profileSchema = yup.object().shape({
    firstName: yup
        .string("First name must be a string.")
        .required("First name required.")
        .min(3, "Must have at least 3 characters."),
    lastName: yup
        .string("Last name must be a string.")
        .required("Last name required.")
        .min(3, "Must have at least 3 characters."),
    email: yup
        .string("Email must be a string.")
        .email("Must be a valid email.")
        .required("Email is required."),
    username: yup
        .string("Username must be a string.")
        .required("Username is required.")
        .min(3, "Must have at least 3 characters."),
});

const moreDetailsSchema = yup.object().shape({
    firstName: yup
        .string("First name must be a string.")
        .required("First name required.")
        .min(3, "Must have at least 3 characters."),
    lastName: yup
        .string("Last name must be a string.")
        .required("Last name required.")
        .min(3, "Must have at least 3 characters."),
    username: yup
        .string("Username must be a string.")
        .required("Username is required.")
        .min(3, "Must have at least 3 characters."),
});

const validateField = async (schema, setter, fieldName, value) => {
    try {
        await schema.validateAt(fieldName, { [fieldName]: value });
        setter((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
        setter((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error.message,
        }));
    }
};

export { profileSchema, validateField, moreDetailsSchema };
