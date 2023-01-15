import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import { newsReducer } from "../reducers/newsReducer";

const rootReducer = combineReducers({
    news:newsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
