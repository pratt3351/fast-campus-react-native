import {UserActions} from '../actions/user';
import {TypeDog} from '../data/TypeDog';
import {TypeUser} from '../data/TypeUser';

export type TypeUserReducer = {
  user: TypeUser | null;
  history: TypeDog[];
};

const initialState: TypeUserReducer = {
  user: null,
  history: [],
};

export const userReducer = (state = initialState, action: UserActions) => {
  if (action.type === 'SET_USER_INFO') {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === 'GET_USER_LIKED_HISTORY_SUCCESS') {
    return {
      ...state,
      history: action.history,
    };
  }
  return {
    ...state,
  };
};
