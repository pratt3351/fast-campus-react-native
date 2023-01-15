import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabNavigation } from './src/navigations/BottomTabNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}