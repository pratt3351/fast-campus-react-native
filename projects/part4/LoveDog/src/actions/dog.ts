import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeDog} from '../data/TypeDog';
import {TypeRootReducer} from '../store';
import {api, createAxiosInstance} from '../utils/AxiosUtils';
import database from '@react-native-firebase/database';
import axios from 'axios';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST' as const;
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS' as const;
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE' as const;

export const LIKE_DOG_REQUEST = 'LIKE_DOG_REQUEST' as const;
export const LIKE_DOG_SUCCESS = 'LIKE_DOG_SUCCESS' as const;
export const LIKE_DOG_FAILURE = 'LIKE_DOG_FAILURE' as const;

export const getDogRequest = () => {
  return {
    type: GET_DOG_REQUEST,
  };
};

export const getDogSuccess = (dog: TypeDog) => {
  return {
    type: GET_DOG_SUCCESS,
    data: dog,
  };
};

export const getDogFailure = () => {
  return {
    type: GET_DOG_FAILURE,
  };
};

export const likeDogRequest = () => {
  return {
    type: LIKE_DOG_REQUEST,
  };
};

export const likeDogSuccess = () => {
  return {
    type: LIKE_DOG_SUCCESS,
  };
};

export const likeDogFailure = () => {
  return {
    type: LIKE_DOG_FAILURE,
  };
};

export const getDog = (): TypeDogThunkAction => async dispatch => {
  dispatch(getDogRequest());

  try {
    const apiResult = await api.get<{
      message: string;
      status: string;
    }>('breeds/image/random');
    const result = apiResult.data;

    dispatch(getDogSuccess({photoUrl: result.message}));
  } catch (ex) {
    dispatch(getDogFailure());
  }
};

export const likeDog =
  (dog: TypeDog): TypeDogThunkAction =>
  async (dispatch, getState) => {
    dispatch(likeDogRequest());
    const user = getState().user.user;

    if (user === null) {
      dispatch(likeDogFailure());
      return;
    }

    if (user.availableLikeCount <= 0) {
      dispatch(likeDogFailure());

      throw Error('Like Today Count is Over');
    }

    try {
      const now = new Date().getTime();
      const ref = `history/${user.uid}`;
      const push = await database().ref(ref).push();
      push.set({
        url: dog.photoUrl,
        regeditAt: now,
      });

      const memberRef = `member/${user.uid}`;
      await database()
        .ref(memberRef)
        .update({
          availableLikeCount: user.availableLikeCount - 1,
        });

      dispatch(likeDogSuccess());
    } catch (ex) {
      dispatch(likeDogFailure());
    }
  };

export type TypeDogThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  DogActions
>;

export type TypeDogDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  DogActions
>;

export type DogActions =
  | ReturnType<typeof getDogRequest>
  | ReturnType<typeof getDogSuccess>
  | ReturnType<typeof getDogFailure>
  | ReturnType<typeof likeDogRequest>
  | ReturnType<typeof likeDogSuccess>
  | ReturnType<typeof likeDogFailure>;
