import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
    duration: 8000,
    dismissible: true,
    position: {
        x: "right",
        y: "bottom",
    },
    types: [
        {
            type: "info",
            background: "blue",
        },
    ],
});

export const showSuccessToastMessage = (message) => {
    return notyf.success(message);
};

export const showErrorToastMessage = (message) => {
    return notyf.error(message);
};

export const showInfoToastMessage = (message) => {
    return notyf.open({
        type: "info",
        message,
    });
};
