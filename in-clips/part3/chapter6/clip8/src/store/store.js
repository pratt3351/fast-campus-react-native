import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';

import { favoriteReducer } from "../reducers/favoritePhoto";

const rootReducer = combineReducers({
    favorite:favoriteReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
