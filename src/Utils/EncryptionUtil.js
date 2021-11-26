import { NODE_ENV } from '../Configs/EnvConfig';

export const encode = (data) => {
    return NODE_ENV === 'production' ? window.btoa(data) : data;
};

export const decode = (data) => {
    return NODE_ENV === 'production' ? window.atob(data) : data;
};