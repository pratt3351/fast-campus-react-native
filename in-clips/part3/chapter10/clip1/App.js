import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './src/navigations/RootStackNavigation';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigation/>
      </NavigationContainer>
    </Provider>
  );
}

