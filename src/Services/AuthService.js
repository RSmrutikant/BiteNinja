import axiosInstance from '../Configs/AxiosConfig';
import { AUTH_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const login = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
};
export const getProfile = () => {
  return axiosInstance.get(AUTH_ENDPOINTS.profile);
};

export const signup = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, data);
};
