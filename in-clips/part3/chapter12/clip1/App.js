import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootApp } from "./src/RootApp";
export default function App() {
  return (
    <SafeAreaProvider>
        <RootApp/>
    </SafeAreaProvider>
  );
}
