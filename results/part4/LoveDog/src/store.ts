import {applyMiddleware, combineReducers, createStore} from 'redux';
import {dogReducer, TypeDogReducer} from './reducers/dog';
import {TypeUserReducer, userReducer} from './reducers/user';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  dog: dogReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type TypeRootReducer = {dog: TypeDogReducer; user: TypeUserReducer};

export default store;
