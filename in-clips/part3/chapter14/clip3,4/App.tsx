import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedListItem } from './src/components/FeedListItem';
import { RootApp } from './src/RootApp';
import {Provider} from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
          <RootApp/>
      </Provider>
    </SafeAreaProvider>
  );
}
