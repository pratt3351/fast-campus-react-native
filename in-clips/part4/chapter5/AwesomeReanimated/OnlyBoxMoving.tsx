import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const OnlyBoxMoving: React.FC = () => {
  const value = useSharedValue(0);

  const onPressButton = useCallback(() => {
    console.log('onPressed');
    value.value = withSpring(Math.random() * 100);
  }, [value]);

  const animStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: value.value}],
    };
  });

  return (
    <View style={{flex: 1, borderWidth: 1}}>
      <Button title="버튼 움직이기" onPress={onPressButton} />
      <View style={{flex: 1}}>
        <Animated.View
          style={[
            animStyles,
            {
              width: 50,
              height: 50,
              borderRadius: 6,
              backgroundColor: 'blue',
            },
          ]}
        />
      </View>
    </View>
  );
};
