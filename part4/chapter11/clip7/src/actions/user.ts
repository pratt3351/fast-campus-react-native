import {TypeUser} from '../data/TypeUser';
export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const setUser = (user: TypeUser) => {
  return {
    type: SET_USER_INFO,
    user: user,
  };
};

export type UserActions = ReturnType<typeof setUser>;
