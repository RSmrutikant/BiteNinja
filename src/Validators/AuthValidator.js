import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required.")
        .min(2, "First name must be atleast 2 characters long.")
        .max(50, "First name can not contain more than 50 characters."),
    lastName: Yup.string()
        .required("Last name is required.")
        .min(2, "Last name must be atleast 2 characters long.")
        .max(50, "Last name can not contain more than 50 characters."),
    email: Yup.string()
        .email("Please enter valid email.")
        .required("Email is required.")
        .min(2, "Email must be atleast 2 characters long.")
        .max(50, "Email can not contain more than 50 characters."),
    password: Yup.string()
        .required("Password is required.")
        .min(2, "Password must be atleast 2 characters long.")
        .max(20, "Email can not contain more than 20 characters."),
    confirmPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    isTermsAccepted: Yup.bool()
        .required("You must agree with terms before submitting.")
        .oneOf([true], "You must agree with terms before submitting."),
    isW9Signed: Yup.bool()
        .required("You must agree with w9-form before submitting.")
        .oneOf([true], "You must agree with w9-form before submitting."),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter valid email.")
        .required("Email is required.")
        .min(2, "Email must be atleast 2 characters long.")
        .max(50, "Email can not contain more than 50 characters."),
    password: Yup.string()
        .required("Password is required.")
        .min(2, "Password must be atleast 2 characters long.")
        .max(20, "Email can not contain more than 20 characters."),
});
