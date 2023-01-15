import {combineReducers, createStore, applyMiddleware} from 'redux';
import { feedListReducer } from './reducers/feedList';
import { userInfoReducer } from './reducers/userInfo';

import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    userInfo:userInfoReducer,
    feedList:feedListReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))
