import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { lottoNumberReducers } from "../reducers/lottoNumbers";

const rootReducer = combineReducers({
    numbers:lottoNumberReducers
})
const persistedReducer = persistReducer({
    key:'root',
    storage:AsyncStorage,
    stateReconciler:hardSet,
}, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persisor = persistStore(store);