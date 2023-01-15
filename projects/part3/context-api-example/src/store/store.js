import { applyMiddleware, combineReducers, createStore } from "redux";
import { countReducer } from "../reducers/count";
import logger from "redux-logger";
const rootReducer = combineReducers({
    count:countReducer,
    // dateCount : 
})

const store = createStore(rootReducer, applyMiddleware(logger));


export default store;
