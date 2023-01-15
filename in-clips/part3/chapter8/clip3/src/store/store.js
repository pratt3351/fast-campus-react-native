import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import {persistReducer, persistStore} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { lottoNumberReducers } from "../reducers/lottoNumbers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
    numbers:lottoNumberReducers,
})
const persistedReducer = persistReducer({key:'root-persist', storage:AsyncStorage, stateReconciler:hardSet}, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
// const store = createStore(rootReducer, applyMiddleware(logger))

// export default ()=>{
//     let store = createStore(persistReducer, applyMiddleware(logger))
//     let persistor = persistStore(store);

//     return {
//         store, persistor
//     }
// }
