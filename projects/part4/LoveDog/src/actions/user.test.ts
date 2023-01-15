import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getUserLikedHistory} from './user';

jest.mock('@react-native-firebase/database', () => {
  return () => ({
    ref: jest.fn().mockImplementation(() => ({
      once: jest.fn().mockReturnValue(
        Promise.resolve({
          val: jest.fn().mockReturnValue({
            TEST: {
              url: 'test',
            },
          }),
        }),
      ),
    })),
  });
});

describe('redux user action test', () => {
  const mockStore = configureStore([thunk]);

  test('getUserLikedHistory test', async () => {
    const store = mockStore({
      user: {
        user: {
          uid: 'TEST_UID',
        },
        history: [],
      },
    });

    //@ts-ignore
    return store.dispatch(getUserLikedHistory()).then(() => {
      const expectedAction = [
        {type: 'GET_USER_LIKED_HISTORY_REQUEST'},
        {type: 'GET_USER_LIKED_HISTORY_SUCCESS', history: [{photoUrl: 'test'}]},
      ];

      const actions = store.getActions();
      return expect(actions).toEqual(expectedAction);
    });
  });
});
