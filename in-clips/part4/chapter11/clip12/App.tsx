/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {
  RootStackNavigation,
  TypeRootStackParams,
} from './src/navigation/RootStackNavigation';
import store from './src/store';
import {withIAPContext} from 'react-native-iap';

GoogleSignin.configure({
  webClientId:
    '357653782570-tv5hhcccangkjekbbj7es26uckr8rg3f.apps.googleusercontent.com',
});

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer<TypeRootStackParams>
            linking={{
              prefixes: ['mydog://'],
              config: {
                screens: {
                  HistoryList: '/history',
                  Main: {
                    path: '/',
                    screens: {
                      Main: '/main',
                      My: '/my',
                    },
                  },
                },
              },
            }}>
            <RootStackNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default withIAPContext(App);
