import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {dogReducer, TypeDogReducer} from './reducers/dog';
import {TypeUserReducer, userReducer} from './reducers/user';

const rootReducer = combineReducers({
  dog: dogReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export type RootReducer = {dog: TypeDogReducer; user: TypeUserReducer};

export default store;
