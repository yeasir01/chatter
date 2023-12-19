import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { object, string } from "yup";

const schema = object().shape({
    name: string().required().min(3),
    email: string().email().required(),
});

const initial = { name: "", email: "" }

function Test() {
    const [state, setState] = React.useState(initial);
    const [formErrors, setFormErrors] = React.useState(initial);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(initial);

        try {
            const res = await schema.validate(state, { abortEarly: false });

            console.log(res);
            console.log("Successful!!");

        } catch (error) {
            const validationErrors = {};

            error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });

           setFormErrors(validationErrors)
        }
    };

    const validateField = async (fieldName, value) => {
        try {
          await schema.validateAt(fieldName, { [fieldName]: value });
          setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        } catch (error) {
            setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
      };
      
    return (
        <>
            <Box component={"form"} onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="name"
                    name="name"
                    value={state.name}
                    error={Boolean(formErrors.name)}
                    helperText={formErrors.name || ""}
                />
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="email"
                    name="email"
                    value={state.email}
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email || ""}
                />
                <Button type="submit">Submit</Button>
            </Box>
        </>
    );
}

export default Test;
