import axiosInstance from '../Configs/AxiosConfig';
import {
  DEPARTMENTS_ENDPOINTS,
  DEPARTMENTS_MASTER_ENDPOINTS,
} from '../Constants/ApiEndpointsConstant';

export const getAllDepartments = (restaurantRef, locationRef, page, search) => {
  return axiosInstance.get(
    DEPARTMENTS_ENDPOINTS.GET_ALL(restaurantRef, locationRef, page, search),
    {
      headers: {
        hideLoader: true,
      },
    },
  );
};

export const getDepartmentDetails = (locationRef) => {
  return axiosInstance.get(DEPARTMENTS_ENDPOINTS.GET_DETAILS(locationRef));
};

export const createDepartment = (data) => {
  return axiosInstance.post(DEPARTMENTS_MASTER_ENDPOINTS.CREATE, data);
};

export const updateDepartment = (id, data) => {
  return axiosInstance.put(DEPARTMENTS_ENDPOINTS.UPDATE(id), data);
};

export const deleteDepartment = (id) => {
  return axiosInstance.delete(DEPARTMENTS_ENDPOINTS.DELETE(id));
};
