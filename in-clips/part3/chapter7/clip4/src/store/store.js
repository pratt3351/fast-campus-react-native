import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { lottoNumberReducers } from "../reducers/lottoNumbers";
const rootReducer = combineReducers({
    numbers:lottoNumberReducers,
})
const store = createStore(rootReducer, applyMiddleware(logger))

export default store;
