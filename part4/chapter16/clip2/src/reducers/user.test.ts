import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {userReducer} from './user';
describe('redux user reducers test', () => {
  const mockStore = configureStore([thunk]);

  test('HistoryListView Render Test', async () => {
    return expect(
      userReducer(
        {user: null, history: []},
        {
          type: 'GET_USER_LIKED_HISTORY_SUCCESS',
          history: [{photoUrl: 'TEST_URL.jpg'}],
        },
      ),
    ).toEqual({
      user: null,
      history: [
        {
          photoUrl: 'TEST_URL.jpg',
        },
      ],
    });
  });
});
