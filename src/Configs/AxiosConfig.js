import axios from 'axios';
import { hideLoader, showLoader } from '../Utils/LoaderUtil';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from '../Utils/ToastUtil';
import { REACT_APP_API_URI } from './EnvConfig';
import Store from '../Store/Store';
import { getItem } from '../Utils/StorageUtil';
import { STORAGE_KEYS } from '../Constants/StorageKeysConstant';
import moment from 'moment-timezone';
const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URI,
});

const httpMethods = ['post', 'put', 'patch', 'delete'];

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
      config.headers['timezone'] = moment.tz.guess();
    }
    if (!config.headers['hideLoader']) {
      delete config.headers['hideLoader'];
      showLoader();
    }

    return config;
  },
  (error) => {
    if (error && error.response) {
      const responseObj = error.response;
      const message =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.toString();
      showToastrBasedOnHttpMethodAndStatusCode(
        message,
        responseObj.config.method,
        responseObj.status,
      );
    } else {
      showToastrBasedOnHttpMethodAndStatusCode(
        'Someting went wrong, please try again later!',
      );
    }
    hideLoader();
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    showToastrBasedOnHttpMethodAndStatusCode(
      response.data.message,
      response.config.method,
      response.status,
    );
    hideLoader();
    console.log('response  from the api', JSON.stringify(response));

    return response;
  },
  (error) => {
    console.log('error  from the api', JSON.stringify(error));

    if (error && error.response) {
      const responseObj = error.response;
      const message =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.toString();
      showToastrBasedOnHttpMethodAndStatusCode(
        message,
        responseObj.config.method,
        responseObj.status,
      );
    } else {
      showToastrBasedOnHttpMethodAndStatusCode(
        'Someting went wrong, please try again later!',
      );
    }
    hideLoader();
    return Promise.reject(error);
  },
);

const showToastrBasedOnHttpMethodAndStatusCode = (
  message,
  httpMethod,
  httpStatusCode,
) => {
  if (httpMethod && httpStatusCode) {
    if (httpMethods.includes(httpMethod)) {
      if (httpStatusCode >= 400) {
        showErrorToastMessage(message);
      } else {
        showSuccessToastMessage(message);
      }
    }
  } else {
    showErrorToastMessage(message);
  }
};

export default axiosInstance;
