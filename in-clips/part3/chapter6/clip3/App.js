import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CounterScreen } from './src/screens/CounterScreen';
import { Provider as StoreProvider} from 'react-redux';
import store from './src/store/store';

export default function App() {
  return (
    <SafeAreaProvider>

      <StoreProvider store={store}>
        <View style={styles.container}>
          <CounterScreen />
          <StatusBar style="auto" />
        </View>
      </StoreProvider>

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
