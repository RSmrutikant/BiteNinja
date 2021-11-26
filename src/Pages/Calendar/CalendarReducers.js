import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./AuthActionTypes";

const initialState = {
  isLoggedIn: false,
  userDetails: null,
  error: null
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        userDetails: payload.userDetails
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
        error: payload.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        userDetails: payload.userDetails
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
        error: payload.error
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        userDetails: null
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;