import axiosInstance from '../Configs/AxiosConfig';
import { CALENDAR_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const createCalendar = (restId, locationId, deptId, data) => {
  return axiosInstance.post(CALENDAR_ENDPOINTS.CREATE(restId, locationId, deptId), data);
};

export const getCalendar = (restId, locationId, deptId, fromDate, toDate) => {
  return axiosInstance.get(CALENDAR_ENDPOINTS.GET_ALL(restId, locationId, deptId, fromDate, toDate));
};

export const publishEvents = (restId, locationId) => {
  return axiosInstance.put(CALENDAR_ENDPOINTS.PUBLISH(restId, locationId));
};
