import {NavigationContainer} from '@react-navigation/native';
import { RootNavigation } from './src/navigations/RootNavigations';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
  );
}

