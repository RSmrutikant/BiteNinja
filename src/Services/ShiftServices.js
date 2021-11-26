import axiosInstance from '../Configs/AxiosConfig';
import { SHIFT_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const getShifts = (fromDate, toDate, size, page) => {
  return axiosInstance.get(
    SHIFT_ENDPOINTS.GET_SHIFTS(fromDate, toDate, size, page),
  );
};
export const getReservation = (fromDate, toDate, size, page) => {
  return axiosInstance.get(
    SHIFT_ENDPOINTS.GET_RESERVATIONS(fromDate, toDate, size, page),
  );
};

export const bidShift = (id) => {
  return axiosInstance.post(SHIFT_ENDPOINTS.BID_SHIFT(id));
};
export const startShift = (id) => {
  return axiosInstance.put(SHIFT_ENDPOINTS.START_SHIFT(id));
};

export const endShift = (id) => {
  return axiosInstance.put(SHIFT_ENDPOINTS.END_SHIFT(id));
};
export const shiftFeedback = (id, body) => {
  return axiosInstance.post(SHIFT_ENDPOINTS.SHIFT_FEEDBACK(id), body);
};

export const unBidShift = (id) => {
  return axiosInstance.post(SHIFT_ENDPOINTS.UNBID_SHIFT(id));
};

export const shiftAproval = (resultId, userId) => {
  return axiosInstance.put(SHIFT_ENDPOINTS.SHIFT_APPROVAL(resultId, userId));
};
export const denyShiftAproval = (resultId, userId) => {
  return axiosInstance.put(
    SHIFT_ENDPOINTS.DENY_SHIFT_APPROVAL(resultId, userId),
  );
};

export const getMyShifts = (fromDate, toDate, size, page) => {
  return axiosInstance.get(
    SHIFT_ENDPOINTS.GET_MY_SHIFT(fromDate, toDate, size, page),
  );
};
