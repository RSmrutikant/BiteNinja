import {
  getShifts,
  bidShift,
  getReservation,
  shiftAproval,
  getMyShifts,
  unBidShift,
  startShift,
  endShift,
  shiftFeedback,
  denyShiftAproval,
} from '../../Services/ShiftServices';

export const getShiftAction = (fromDate, toDate, size, page, callback = {}) => {
  return async () => {
    try {
      const { data } = await getShifts(fromDate, toDate, size, page);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const bidShiftAction = (id, callback = {}) => {
  return async () => {
    try {
      const { data } = await bidShift(id);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};
export const unBidShiftAction = (id, callback = {}) => {
  return async () => {
    try {
      const { data } = await unBidShift(id);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};
// shifts / reservations;

export const getAdminReservation = (
  fromDate,
  toDate,
  size,
  page,
  callback = {},
) => {
  return async () => {
    try {
      const { data } = await getReservation(fromDate, toDate, size, page);

      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const assignShift = (resultId, userId, callback = {}) => {
  return async () => {
    try {
      const { data } = await shiftAproval(resultId, userId);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const denyShictAction = (resultId, userId, callback = {}) => {
  return async () => {
    try {
      const { data } = await denyShiftAproval(resultId, userId);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

// my shift

export const getMyShift = (fromDate, toDate, size, page, callback = {}) => {
  return async () => {
    try {
      const { data } = await getMyShifts(fromDate, toDate, size, page);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const startShiftAction = (id, callback = {}) => {
  return async () => {
    try {
      const { data } = await startShift(id);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const endShiftAction = (id, callback = {}) => {
  return async () => {
    try {
      const { data } = await endShift(id);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};

export const feedbacAction = (id, body, callback = {}) => {
  return async () => {
    try {
      const { data } = await shiftFeedback(id, body);
      callback(data?.data);
    } catch (error) {
      console.log('loginAction error :: ', error);
    }
  };
};
