import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';

import { countReducer } from "../reducer/count";

const rootReducer = combineReducers({
    count:countReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
