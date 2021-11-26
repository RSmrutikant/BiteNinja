import axiosInstance from '../Configs/AxiosConfig';
import { USERS_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const getAllUsers = (role, page) => {
    return axiosInstance.get(USERS_ENDPOINTS.GET_ALL_USERS(role, page));
};

export const getUserDetails = userRef => {
    return axiosInstance.get(USERS_ENDPOINTS.GET_USER_DETAILS(userRef));
};

export const createUser = data => {
    return axiosInstance.post(USERS_ENDPOINTS.CREATE_USER, data);
};

export const updateUser = (userRef, data) => {
    return axiosInstance.put(USERS_ENDPOINTS.UPDATE_USER(userRef), data);
};

export const deleteUser = userRef => {
    return axiosInstance.delete(USERS_ENDPOINTS.DELETE_USER(userRef));
};

export const updateUserStatus = (userRef, type) => {
    return axiosInstance.patch(USERS_ENDPOINTS.UPDATE_USER_STATUS(userRef, type));
}