import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import {Provider} from 'react-redux';
import { store } from './src/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'react-native-gesture-handler';

GoogleSignin.configure();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
          <RootApp/>
      </Provider>
    </SafeAreaProvider>
  );
}
