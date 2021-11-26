import { decode, encode } from './EncryptionUtil';

const storageMechanism = window.sessionStorage; // or window.localStorage;

export const setItem = (key, value) => {
    const encodedValue = encode(JSON.stringify(value));
    storageMechanism.setItem(key, encodedValue);
};

export const getItem = (key) => {
    const value = storageMechanism.getItem(key);
    if (value) {
        return JSON.parse(decode(value));
    }

    return null;
};

export const removeItem = (key) => {
    storageMechanism.removeItem(key);
};

export const clearStorage = () => {
    storageMechanism.clear();
};