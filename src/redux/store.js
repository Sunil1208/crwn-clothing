import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import logger from 'redux-logger';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
