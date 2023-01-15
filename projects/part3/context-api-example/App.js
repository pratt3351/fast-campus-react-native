import { createContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { CounterScreen } from './src/screens/CounterScreen';

export const CounterContext = createContext();


export default function App() {
  const counterState = useState(0);

  return (
      <SafeAreaProvider>
        <CounterContext.Provider value={counterState}>

          <CounterScreen/> 
        </CounterContext.Provider>
      </SafeAreaProvider>
  );
}