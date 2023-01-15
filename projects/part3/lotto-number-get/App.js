import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {BottomTabNavigation} from './src/navigation/BottomTabNavigation';
import store from './src/store/store'


export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>

        <NavigationContainer>
          <BottomTabNavigation/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}