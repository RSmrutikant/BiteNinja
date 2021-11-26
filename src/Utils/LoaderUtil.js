export const showLoader = () => {
    const overlayElem = document.getElementById('overlay');
    if (overlayElem) {
        overlayElem.style.display = 'block';
    }
};

export const hideLoader = () => {
    const overlayElem = document.getElementById('overlay');
    if (overlayElem) {
        const timeout = setTimeout(() => {
            overlayElem.style.display = 'none';
            clearTimeout(timeout);
        }, 200);
    }
};