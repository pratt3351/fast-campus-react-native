import {render, screen, waitFor} from '@testing-library/react-native';
import React from 'react';
import {DogPhotoView} from './DogPhotoView';
import MockAdapter from 'axios-mock-adapter';
import {api} from '../utils/AxiosUtils';

describe('DogPhotoView Render Test', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api);
  });
  afterEach(() => {
    mock.reset();
  });

  test('DogPhotoView Render Test', async () => {
    mock.onGet(new RegExp('/breeds/image/random')).reply(200, {
      message: 'TEST_MESSAGE',
      status: 'SUCCESS',
    });
    // axios.get.mockImplementation(()=> )

    const component = render(<DogPhotoView />);
    await waitFor(() => component.findByTestId('image'), {
      timeout: 2000,
    });

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
