/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, type PropsWithChildren} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from 'react-native/Libraries/NewAppScreen';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const value = useSharedValue(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onScroll = useAnimatedScrollHandler(event => {
    value.value = event.contentOffset.y;
  });

  const floatingButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(value.value, [50, 100], [50, -100], {
            extrapolateRight: Extrapolation.CLAMP,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Animated.FlatList
        style={{flex: 1}}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        onScroll={onScroll}
        scrollEventThrottle={1}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />

      <Pressable style={{position: 'absolute', right: 24, bottom: 24}}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            },
            floatingButtonStyle,
          ]}>
          <Text style={{color: 'white', fontSize: 24}}>+</Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;
