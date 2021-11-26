import * as Yup from 'yup';

export const addDepartmentSchema = Yup.object().shape({
    departmentName: Yup.string()
        .required('DepartmentName is required.')
        .min(2, 'DepartmentName must be atleast 2 characters long.')
        .max(50, 'DepartmentName can not contain more than 50 characters.'),
    locationIds: Yup.array().min(1)
        .required('Location is required.'),
    restaurantId: Yup.string()
        .required('Restaurant is required.')
});

export const editDepartmentSchema = Yup.object().shape({
    departmentName: Yup.string()
        .required('DepartmentName is required.')
        .min(2, 'DepartmentName must be atleast 2 characters long.')
        .max(50, 'DepartmentName can not contain more than 50 characters.'),
    locationIds: Yup.array().min(1)
        .required('Location is required.'),
    restaurantId: Yup.string()
        .required('Restaurant is required.')
});