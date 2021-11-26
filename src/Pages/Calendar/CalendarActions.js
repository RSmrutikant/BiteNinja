import { STORAGE_KEYS } from '../../Constants/StorageKeysConstant';
import history from '../../Utils/HistoryUtil';
import { signup, login } from '../../Services/AuthService';
import { loginSuccessActionType, loginFailureActionType, signupSuccessActionType, signupFailureActionType } from './AuthActionTypes';

export const getRestaurantAction = payload => {
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
  }
};

export const loginAction = payload => {
  return async (dispatch) => {
    try {
      const { data } = await login(payload);
      const userDetails = data.data.user;

      // update redux store
      dispatch(loginSuccessActionType({ userDetails: data.data.user }));

      // store user details in browser storage
      setItem(STORAGE_KEYS.USER_DETAILS, userDetails);

      // redirect to home page
      history.push('/myshifts');
    } catch (error) {
      dispatch(loginFailureActionType({ error: 'Unable to login.' }));
      console.log('loginAction error :: ', error);
    }
  }
};