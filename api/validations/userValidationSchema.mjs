import yup from "yup";

const userValidation = yup.object({
    body: yup.object({
        firstName: yup
            .string("First Name must be a string.")
            .min(3, "First Name must contain three characters.")
            .max(32, "First Name must not exceed 32 characters."),
        lastName: yup
            .string("Last Name must be a string.")
            .min(3, "Last Name must contain three characters.")
            .max(32, "Last Name must not exceed 32 characters."),
        username: yup
            .string("Username must be a string.")
            .min(3, "Username must contain three characters.")
            .max(32, "Username must not exceed 32 characters."),
        email: yup.
            string("Email must be a string.")
            .email("Invalid email address."),
        bio: yup
            .string("Bio must be a string.")
            .max(255, "Bio must not exceed 255 characters."),
        status: yup
            .string("Status must be a string.")
            //.oneOf(["active", "inactive", "away"]),
        //appMeta: yup.string(),
    }),
});

export default userValidation;
