import {DogActions} from '../actions/dog';
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

export const userReducer = (
  state = initialState,
  action: UserActions | DogActions,
) => {
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
  if (action.type === 'LIKE_DOG_SUCCESS') {
    return {
      ...state,
      user:
        state.user !== null
          ? {
              ...state.user,
              availableLikeCount: state.user.availableLikeCount - 1,
            }
          : null,
    };
  }

  if (action.type === 'PURCHASED_ITEM_SUCCESS') {
    return {
      ...state,
      user:
        state.user !== null
          ? {
              ...state.user,
              availableLikeCount: state.user.availableLikeCount + 5,
            }
          : null,
    };
  }
  return {
    ...state,
  };
};
