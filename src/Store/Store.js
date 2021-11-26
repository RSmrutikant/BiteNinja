import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import RootReducer from './RootReducer';

const middlewares = [reduxThunk];

const enhancers = compose(applyMiddleware(...middlewares));

const Store = createStore(RootReducer, enhancers);

export default Store;