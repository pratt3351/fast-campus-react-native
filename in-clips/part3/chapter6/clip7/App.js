import { StatusBar } from 'expo-status-bar';
import { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { CounterScreen } from './src/screens/CounterScreen';
export default function App() {
  const counterState = useState(0);

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <View style={styles.container}>
          <CounterScreen />
          <StatusBar style="auto" />
        </View>
      </RecoilRoot>
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
