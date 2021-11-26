import * as Yup from 'yup';

export const addRestaurantSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required.')
        .min(2, 'First name must be atleast 2 characters long.')
        .max(50, 'First name can not contain more than 50 characters.'),
    lastName: Yup.string()
        .required('Last name is required.')
        .min(2, 'Last name must be atleast 2 characters long.')
        .max(50, 'Last name can not contain more than 50 characters.'),
    email: Yup.string()
        .email('Please enter valid email.')
        .required('Email is required.')
        .min(2, 'Email must be atleast 2 characters long.')
        .max(50, 'Email can not contain more than 50 characters.'),
    mobileNo: Yup.string()
        .required('Mobile Number is required')
        .matches(/^[1-9][0-9]*$/, 'Mobile number must be only digits')
        .min(8, 'Mobile number must be atleast 8 digits')
        .max(12, 'Mobile number must be maximum 12 digits'),
    restaurantName: Yup.string()
        .required('Restaurant Name is required.')
        .min(2, 'Last name must be atleast 2 characters long.')
        .max(50, 'Last name can not contain more than 50 characters.'),
    country: Yup.string()
        .required('Country is required.')
});

export const editRestaurantSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be atleast 2 characters long.')
        .max(50, 'First name can not contain more than 50 characters.'),
    lastName: Yup.string()
        .min(2, 'Last name must be atleast 2 characters long.')
        .max(50, 'Last name can not contain more than 50 characters.'),
    email: Yup.string()
        .email('Please enter valid email.')
        .min(2, 'Email must be atleast 2 characters long.')
        .max(50, 'Email can not contain more than 50 characters.'),
    mobileNo: Yup.string()
        .matches(/^[1-9][0-9]*$/, 'Mobile number must be only digits')
        .min(8, 'Mobile number must be atleast 8 digits')
        .max(12, 'Mobile number must be maximum 12 digits'),
    restaurantName: Yup.string()
        .min(2, 'Last name must be atleast 2 characters long.')
        .max(50, 'Last name can not contain more than 50 characters.'),
    country: Yup.string()
});