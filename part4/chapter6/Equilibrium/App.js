/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';
const App = () => {
  const accelerometerValue = useSharedValue({x: 0, y: 0, z: 0});

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z, timestamp}) => {
      accelerometerValue.value = {x, y, z};
      console.log(x, y, z);
    });

    return () => subscription.unsubscribe();
  }, [accelerometerValue, accelerometerValue.value]);

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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderWidth: 1,
        }}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
};

export default App;
