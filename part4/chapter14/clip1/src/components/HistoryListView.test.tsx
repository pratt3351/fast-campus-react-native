import {render, screen, waitFor} from '@testing-library/react-native';
import {HistoryListView} from './HistoryListView';
// import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('@react-native-firebase/database', () => {
  return () => ({
    ref: jest.fn().mockImplementation(() => ({
      once: jest.fn().mockReturnValue(
        Promise.resolve({
          val: jest.fn().mockReturnValue({
            TEST: {
              url: 'TEST',
            },
          }),
        }),
      ),
    })),
  });
});

describe('HistoryListView Render Test', () => {
  const initialState = {};
  const mockStore = configureStore([thunk]);

  let store, wrapper;

  beforeAll(() => {});
  afterEach(() => {});
  const onPressItem = jest.fn();

  test('HistoryListView Render Test', async () => {
    store = mockStore({
      user: {
        user: {
          uid: 'TEST_UID',
        },
        history: [
          // {
          //   TEST: {
          //     url: 'TEST',
          //   },
          // },
        ],
      },
    });

    const {findByTestId} = render(
      <Provider store={store}>
        <HistoryListView onPressItem={onPressItem} />
      </Provider>,
    );

    const state = store.getState();
    console.log(state);

    await waitFor(() => findByTestId('Button0'), {
      timeout: 3000,
    });

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
