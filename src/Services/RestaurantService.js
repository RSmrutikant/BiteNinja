import axiosInstance from '../Configs/AxiosConfig';
import { RESTAURANTS_ENDPOINTS } from '../Constants/ApiEndpointsConstant';
import { STORAGE_KEYS } from '../Constants/StorageKeysConstant';
import { getItem } from '../Utils/StorageUtil';

export const getAllRestaurants = (page, search, status) => {
  return axiosInstance.get(
    RESTAURANTS_ENDPOINTS.GET_ALL(page, search, status),
    {
      headers: {
        hideLoader: true,
      },
    },
  );
};

export const getRestaurantDetails = (restaurantRef) => {
  return axiosInstance.get(RESTAURANTS_ENDPOINTS.GET_DETAILS(restaurantRef));
};

export const createRestaurant = (data) => {
  return axiosInstance.post(RESTAURANTS_ENDPOINTS.CREATE, data);
};

export const updateRestaurant = (restaurantRef, userRef, data) => {
  return axiosInstance.put(
    RESTAURANTS_ENDPOINTS.UPDATE(restaurantRef, userRef),
    data,
  );
};
export const updateZoom = (deptId, payload) => {
  return axiosInstance.patch(
    RESTAURANTS_ENDPOINTS.ZOOM_UPDATE(deptId),
    payload,
  );
};

export const deleteRestaurant = (restaurantRef) => {
  return axiosInstance.delete(RESTAURANTS_ENDPOINTS.DELETE(restaurantRef));
};

export const createRestaurantV2 = (data) => {
  return axiosInstance.post(RESTAURANTS_ENDPOINTS.CREATE_V2, data);
};
