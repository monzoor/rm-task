import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootRecucer from '../RootReducers';

const initialState = {};
const middleware = [thunk];

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              name: 'rmApp',
              actionsBlacklist: ['REDUX_STORAGE_SAVE'],
          })
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootRecucer, initialState, enhancer);

export default store;
