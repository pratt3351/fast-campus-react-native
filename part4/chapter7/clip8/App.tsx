/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {RootNavigations} from './src/navigations/RootNavigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootNavigations />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
