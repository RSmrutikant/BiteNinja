import { STORAGE_KEYS } from '../../Constants/StorageKeysConstant';
import history from '../../Utils/HistoryUtil';
import { signup, login, getProfile } from '../../Services/AuthService';
import {
  loginSuccessActionType,
  loginFailureActionType,
  signupSuccessActionType,
  signupFailureActionType,
  profile,
} from './AuthActionTypes';
import { setItem } from '../../Utils/StorageUtil';

export const signupAction = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await signup(payload);
      const userDetails = data.data.user;

      // update redux store
      dispatch(signupSuccessActionType({ userDetails }));

      // redirect to login page
      history.push('/auth/login');
    } catch (error) {
      dispatch(signupFailureActionType({ error: 'Unable to signup.' }));
      console.log('signupAction error :: ', error);
    }
  };
};

export const loginAction = payload => {
  return async (dispatch) => {
    try {
      const { data } = await login(payload);
      const userDetails = data?.data;
      const AccessToken = data?.data?.accessToken;

      // update redux store
      dispatch(loginSuccessActionType({ userDetails: userDetails }));
      // dispatch(userProfile());
      // store user details in browser storage
      setItem(STORAGE_KEYS.LOGIN_DETAILS, userDetails);
      setItem(STORAGE_KEYS.ACCESS_TOKEN, AccessToken);
      // redirect to home page
      const userProfile = await getProfile();
      const userProfileDetails = userProfile.data?.data;

      if (userProfileDetails.role == 'admin')
        history.push('/calendar');
      else history.push('/myshifts');
    } catch (error) {
      dispatch(loginFailureActionType({ error: 'Unable to login.' }));
      console.log('loginAction error :: ', error);
    }
  }
}

export const userProfile = (callback = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getProfile();
      const userDetails = data?.data;
      dispatch(profile({ userDetails: userDetails }));
      callback(userDetails);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};
