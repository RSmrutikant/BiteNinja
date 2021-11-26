export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const PROFILE = 'PROFILE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT = 'LOGOUT';

export const signupSuccessActionType = (payload) => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};

export const signupFailureActionType = (payload) => {
  return {
    type: SIGNUP_FAILURE,
    payload,
  };
};

export const loginSuccessActionType = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
export const profile = (payload) => {
  return {
    type: PROFILE,
    payload,
  };
};

export const loginFailureActionType = (payload) => {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
};

export const logoutActionType = () => {
  return {
    type: LOGOUT,
  };
};
