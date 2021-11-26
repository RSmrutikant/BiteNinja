import axiosInstance from '../Configs/AxiosConfig';
import { DEPARTMENTS_MASTER_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const getAllDepartmentMaster = (page, search) => {
  return axiosInstance.get(DEPARTMENTS_MASTER_ENDPOINTS.GET_ALL(page, search), {
    headers: {
      hideLoader: true,
    },
  });
};

export const getDepartmentDetailMaster = (locationRef) => {
  return axiosInstance.get(
    DEPARTMENTS_MASTER_ENDPOINTS.GET_DETAILS(locationRef),
  );
};

export const createDepartmentMaster = (data) => {
  return axiosInstance.post(DEPARTMENTS_MASTER_ENDPOINTS.CREATE, data);
};

export const updateDepartmentMaster = (id, data) => {
  return axiosInstance.patch(DEPARTMENTS_MASTER_ENDPOINTS.UPDATE(id), data);
};

export const deleteDepartmentMaster = (id) => {
  return axiosInstance.delete(DEPARTMENTS_MASTER_ENDPOINTS.DELETE(id));
};
