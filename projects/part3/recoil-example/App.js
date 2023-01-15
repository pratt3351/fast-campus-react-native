import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { CounterScreen } from './src/screens/CounterScreen';

export default function App() {
  return (
      <SafeAreaProvider>
        <RecoilRoot>
          <CounterScreen/> 
        </RecoilRoot>
      </SafeAreaProvider>
  );
}