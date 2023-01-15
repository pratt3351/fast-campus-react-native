import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { RootNavigation } from './src/navigations/RootNavigation';
import {RecoilCustomPersist} from './src/RecoilCustomPersist'
export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <RecoilCustomPersist>
          <NavigationContainer>
            <RootNavigation/>
          </NavigationContainer>
        </RecoilCustomPersist>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}