import { combineReducers } from 'redux';

import AuthReducer from '../Pages/Auth/AuthReducer';

const RootReducer = combineReducers({
    authData: AuthReducer
});

export default RootReducer;