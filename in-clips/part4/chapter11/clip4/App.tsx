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
import {RootStackNavigation} from './src/navigation/RootStackNavigation';
GoogleSignin.configure({
  webClientId:
    '641193871127-gjur88587p87l7mgo979jkme4l6f416b.apps.googleusercontent.com',
});

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
