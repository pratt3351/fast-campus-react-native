import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { RootStackNavigations } from "./src/navigations/RootStackNavigations";
import store from './src/store/store';

console.warn = ()=>{};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStackNavigations/>
      </Provider>
    </NavigationContainer>
  );
}
