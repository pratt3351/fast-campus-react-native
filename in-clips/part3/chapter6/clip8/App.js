import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { RootNavigation } from './src/navigations/RootNavigations';
import store from './src/store/store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootNavigation/>
      </Provider>
    </NavigationContainer>
  );
}

