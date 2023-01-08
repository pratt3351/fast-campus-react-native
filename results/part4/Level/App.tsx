/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const accelerometerValue = useSharedValue({x: 0, y: 0, z: 0});
  const [value, setValue] = useState({x: 0, y: 0, z: 0});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      accelerometerValue.value = {x, y, z};
      setValue({x, y, z});
      console.log(x, y, z);
    });

    return () => subscription.unsubscribe();
  }, [accelerometerValue]);

  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [-1, 0],
        ['red', 'green'],
      ),
    };
  });

  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [0, 1],
        ['green', 'red'],
      ),
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flex: 1,
        }}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
};

export default App;
