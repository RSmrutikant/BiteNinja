import axiosInstance from '../Configs/AxiosConfig';
import { MEETINGS_ENDPOINTS } from '../Constants/ApiEndpointsConstant';

export const getAllMeetings = () => {
    return axiosInstance.get(MEETINGS_ENDPOINTS.GET_ALL);
};

export const createMeeting = data => {
    return axiosInstance.post(MEETINGS_ENDPOINTS.CREATE, data);
};

export const updateMeeting = (id, data) => {
    return axiosInstance.put(MEETINGS_ENDPOINTS.UPDATE(id), data);
};

export const deleteMeeting = id => {
    return axiosInstance.delete(MEETINGS_ENDPOINTS.DELETE(id));
};

export const generateSignature = async (data) => {
    return axiosInstance.post(MEETINGS_ENDPOINTS.GENERATE_SIGNATURE, data);
};