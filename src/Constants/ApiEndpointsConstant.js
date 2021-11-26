export const AUTH_ENDPOINTS = {
  LOGIN: '/v1/auth/login',
  SIGNUP: '/v1/auth/signup',
  profile: '/v1/auth/profile',
};

export const USERS_ENDPOINTS = {
  GET_ALL_USERS: (role, page) => `/v1/users?role=${role}&page=${page}`,
  GET_USER_DETAILS: (userRef) => `/v1/users/${userRef}`,
  CREATE_USER: '/v1/users',
  UPDATE_USER: (userRef) => `/v1/users/${userRef}`,
  DELETE_USER: (userRef) => `/v1/users/${userRef}`,
  UPDATE_USER_STATUS: (userRef, type) => `/v1/users/${userRef}/status/${type}`,
};

export const MEETINGS_ENDPOINTS = {
  GET_ALL: '/v1/meetings',
  CREATE: '/v1/meetings',
  UPDATE: (id) => `/v1/meetings/${id}`,
  DELETE: (id) => `/v1/meetings/${id}`,
  GENERATE_SIGNATURE: '/v1/meetings/generate-signature',
};

export const RESTAURANTS_ENDPOINTS = {
  GET_ALL: (page = 1, search = '') =>
    `/v1/restaurants?page=${page}&search=${search}`,
  GET_DETAILS: (id) => `/v1/restaurants/${id}`,
  CREATE: '/v1/restaurants',
  CREATE_V2: '/v2/restaurants',
  UPDATE: (id, userRef) => `/v1/restaurants/${id}?userRef=${userRef}`,
  DELETE: (id) => `/v1/restaurants/${id}`,
  ZOOM_UPDATE: (id) => `/v1/restaurants/department/${id}/zoom`,
};

export const LOCATIONS_ENDPOINTS = {
  GET_ALL: (restaurantRef, page = 1, search = '') =>
    `v1/restaurants/${restaurantRef}/locations?page=${page}&search=${search}`,
  GET_DETAILS: (id) => `/v1/locations/${id}`,
  CREATE: '/v1/locations',
  UPDATE: (id, userRef) => `/v1/locations/${id}`,
  DELETE: (id) => `/v1/locations/${id}`,
};

export const DEPARTMENTS_ENDPOINTS = {
  GET_ALL: (restaurantRef, locationRef, page = 1, search = '') =>
    `v1/restaurants/${restaurantRef}/locations/${locationRef}/departments?page=${page}&search=${search}`,
  GET_DETAILS: (id) => `/v1/departments/${id}`,
  CREATE: '/v1/departments',
  UPDATE: (id) => `/v1/departments/${id}`,
  DELETE: (id) => `/v1/departments/${id}`,
};

export const DEPARTMENTS_MASTER_ENDPOINTS = {
  GET_ALL: (page = 1, search = '') =>
    `/v1/department-master?page=${page}&search=${search}`,
  GET_DETAILS: (id) => `/v1/department-master/${id}`,
  CREATE: '/v1/department-master',
  UPDATE: (id) => `/v1/department-master/${id}`,
  DELETE: (id) => `/v1/department-master/${id}`,
};

export const CALENDAR_ENDPOINTS = {
  GET_ALL: (restId, locationId, deptId, fromDate, toDate) =>
    `/v1/restaurants/${restId}/locations/${locationId}/schedule?departmentId=${deptId}&fromDate=${fromDate}&toDate=${toDate}`,
  CREATE: (restId, locationId, deptId) =>
    `/v1/restaurants/${restId}/locations/${locationId}/departments/${deptId}/schedule`,
  PUBLISH: (restId, locationId) =>
    `/v1/restaurants/${restId}/locations/${locationId}/schedule/publish`,
};
export const SHIFT_ENDPOINTS = {
  GET_SHIFTS: (fromDate, toDate, size, page) =>
    `/v1/shifts?fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}`,
  GET_RESERVATIONS: (fromDate, toDate, size, page) =>
    `/v1/shifts/reservations?fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}`,
  BID_SHIFT: (id) => `/v1/shifts/${id}/bid`,
  UNBID_SHIFT: (id) => `/v1/shifts/${id}/unbid`,
  SHIFT_APPROVAL: (resultId, userId) =>
    `/v1/shifts/${resultId}/user/${userId}/approve`,
  DENY_SHIFT_APPROVAL: (resultId, userId) =>
    `/v1/shifts/${resultId}/user/${userId}/deny`,
  //my shuft
  GET_MY_SHIFT: (fromDate, toDate, size, page) =>
    `/v1/shifts/upcoming-shifts?fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}`,
  START_SHIFT: (id) => `/v1/shifts/allocated-shifts/${id}/start`,
  END_SHIFT: (id) => `/v1/shifts/allocated-shifts/${id}/end`,
  SHIFT_FEEDBACK: (id) => `/v1/shifts/${id}/feedbacks`,
};
// reservations?fromDate=2021-08-08&toDate=2021-08-14&page=1&size=2
