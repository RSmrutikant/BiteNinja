import * as Yup from 'yup';

export const addLocationSchema = Yup.object().shape({
    locationName: Yup.string()
        .required('Location Name is required.')
        .min(2, 'Location Name must be atleast 2 characters long.')
        .max(50, 'Location Name can not contain more than 50 characters.'),
    locationAddress: Yup.string()
        .required('Location Address is required.')
        .min(2, 'Location Address must be atleast 2 characters long.')
        .max(50, 'Location Address can not contain more than 50 characters.'),
    restaurantId: Yup.string()
        .required('Restaurant is required.')
});

export const editLocationSchema = Yup.object().shape({
    locationName: Yup.string()
        .required('Location Name is required.')
        .min(2, 'Location Name must be atleast 2 characters long.')
        .max(50, 'Location Name can not contain more than 50 characters.'),
    locationAddress: Yup.string()
        .required('Location Address is required.')
        .min(2, 'Location Address must be atleast 2 characters long.')
        .max(50, 'Location Address can not contain more than 50 characters.'),
    restaurantId: Yup.string()
        .required('Restaurant is required.')
});