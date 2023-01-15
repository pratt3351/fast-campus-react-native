import {render, waitFor} from '@testing-library/react-native';
import {HistoryListView} from './HistoryListView';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

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

describe('HistoryListView Render Test', () => {
  const initialState = {};
  const mockStore = configureStore([thunk]);

  //@ts-ignore
  let store;

  beforeAll(() => {
    store = mockStore({
      user: {
        user: {
          uid: 'TEST_ID',
        },
      },
    });
  });
  test('HistoryListView Render Snapshot Test', async () => {
    const onPressItem = jest.fn();

    const compoenent = render(
      //ts-ignore
      <Provider store={store}>
        <HistoryListView onPressItem={onPressItem} />
      </Provider>,
    );

    await waitFor(() => compoenent.findByTestId('Button0'), {
      timeout: 2000,
    });

    expect(compoenent.toJSON()).toMatchSnapshot();
  });
});
