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

const groupNameSchema = yup.object().shape({
    groupName: yup
        .string("Group name must be a string.")
        .required("Group name is a required field.")
        .min(3, "Must have at least 3 characters."),
});

const validateField = async (schema, setter, fieldName, value) => {
    try {
        await schema.validateAt(fieldName, { [fieldName]: value });
        setter((state) => ({
            ...state,
            [fieldName]: "",
        }));
    } catch (error) {
        setter((state) => ({
            ...state,
            [fieldName]: error.message,
        }));
    }
};

const validate = async (schema, state) => {
    try {
        await schema.validate(state, { abortEarly: false });
    } catch (error) {
        throw error
    }
};

export { profileSchema, validateField, moreDetailsSchema, groupNameSchema, validate };
