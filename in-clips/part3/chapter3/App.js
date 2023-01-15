import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AtomComponentApp from './AtomComponentApp';
import ScreenComponentApp from './ScreenComponentApp';
export default function App() {
  return (
    <SafeAreaProvider>

    <View style={styles.container}> 
      {/* <AtomComponentApp/> */}
      <ScreenComponentApp/>
    </View>
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
