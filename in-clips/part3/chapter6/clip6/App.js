import { StatusBar } from 'expo-status-bar';
import { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CounterScreen } from './src/screens/CounterScreen';

export const CounterContext = createContext();


export default function App() {
  const counterState = useState(0);

  return (
    <SafeAreaProvider>
      <CounterContext.Provider value={counterState}>
        <View style={styles.container}>
          <CounterScreen />
          <StatusBar style="auto" />
        </View>
      </CounterContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
