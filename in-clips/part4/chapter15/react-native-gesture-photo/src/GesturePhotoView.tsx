import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Image as RNImage, ImageStyle } from 'react-native';

export const GesturePhotoView: React.FC<{
  url: string;
  photoWidth: number;
  photoHeight: number;
  imageStyle?: ImageStyle;
  onGesture: (direction: 'left' | 'right') => void;
}> = (props) => {
  const start = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(offset.value.x, [-200, 0, 200], [0.5, 1, 0.5]),
      transform: [
        {
          translateX: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-100, 0, 100]
          ),
        },
        {
          translateY: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-50, 0, -50]
          ),
        },
        {
          rotate: `${interpolate(
            offset.value.x,
            [-200, 0, 200],
            [30, 0, -30]
          )}deg`,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      // console.log('onBegin');
      isPressed.value = true;
    })
    .onUpdate((e) => {
      // console.log('onUpdate');
      offset.value = {
        x: e.translationX + start.value.x,
        y: offset.value.y,
      };
    })
    .onEnd(() => {
      console.log('onEnd');
    })
    .onFinalize(() => {
      if (offset.value.x < -150) {
        //왼쪽으로 넘어감

        runOnJS(props.onGesture)('left');
      }

      if (offset.value.x > 150) {
        runOnJS(props.onGesture)('right');
      }

      offset.value = {
        x: 0,
        y: 0,
      };

      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
        }}
      >
        <Animated.View style={animatedStyle}>
          <RNImage
            source={{ uri: props.url }}
            style={[
              props.imageStyle,
              { width: props.photoWidth, height: props.photoHeight },
            ]}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
