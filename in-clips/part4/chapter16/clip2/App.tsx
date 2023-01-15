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
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Config from 'react-native-config';
import StorybookUIRoot from './storybook';

GoogleSignin.configure({
  webClientId:
    '357653782570-tv5hhcccangkjekbbj7es26uckr8rg3f.apps.googleusercontent.com',
});

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
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

export default Config.LOAD_STORYBOOK === 'true'
  ? StorybookUIRoot
  : withIAPContext(App);
