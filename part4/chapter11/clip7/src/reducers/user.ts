import {UserActions} from '../actions/user';
import {TypeUser} from '../data/TypeUser';

export type TypeUserReducer = {
  user: TypeUser | null;
};

const initialState: TypeUserReducer = {
  user: null,
};

export const userReducer = (state = initialState, action: UserActions) => {
  if (action.type === 'SET_USER_INFO') {
    return {
      user: action.user,
    };
  }
  return {
    ...state,
  };
};
