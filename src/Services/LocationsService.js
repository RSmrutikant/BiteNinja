import axiosInstance from '../Configs/AxiosConfig';
import { LOCATIONS_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const getAllLocations = (restuarantRef, page, search) => {
  return axiosInstance.get(
    LOCATIONS_ENDPOINTS.GET_ALL(restuarantRef, page, search),
    {
      headers: {
        hideLoader: true,
      },
    },
  );
};

export const getLocationDetails = (locationRef) => {
  return axiosInstance.get(LOCATIONS_ENDPOINTS.GET_DETAILS(locationRef));
};

export const createLocation = (data) => {
  return axiosInstance.post(LOCATIONS_ENDPOINTS.CREATE, data);
};

export const updateLocation = (id, data) => {
  return axiosInstance.put(LOCATIONS_ENDPOINTS.UPDATE(id), data);
};

export const deleteLocation = (id) => {
  return axiosInstance.delete(LOCATIONS_ENDPOINTS.DELETE(id));
};
