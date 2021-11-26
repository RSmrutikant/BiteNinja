import { NODE_ENV } from '../Configs/EnvConfig';

let storageKeys = {
  USER_DETAILS: 'userDetails',
  ACCESS_TOKEN: 'accessToken',
  LOGIN_DETAILS: 'loginDetails',
};

if (NODE_ENV === 'production') {
  storageKeys = {
    USER_DETAILS: 'u@3$-#e5a*ls',
    ACCESS_TOKEN: 'asd23@$sd-a*da',
  };
}

export const STORAGE_KEYS = storageKeys;
