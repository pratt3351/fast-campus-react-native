/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
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
} from 'react-native-reanimated';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollValue = useSharedValue(-50);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollValue.value = event.contentOffset.y;
  });

  const floatingButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollValue.value, [50, 100], [50, -100], {
            extrapolateRight: Extrapolation.CLAMP,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Animated.FlatList
        style={{flex: 1}}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item.toString()}
        scrollEventThrottle={1}
        onScroll={onScroll}
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

      <Pressable style={{position: 'absolute', right: 24, bottom: 32}}>
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
