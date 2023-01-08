import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  concat,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {getDog, likeDog, TypeDogDispatch} from '../actions/dog';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {TypeDog} from '../data/TypeDog';
import {RootReducer} from '../store';

export const MainScreen: React.FC = () => {
  const dog = useSelector<RootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );
  const dispatch = useDispatch<TypeDogDispatch>();

  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});
  const isPressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(offset.value.x, [-200, 0, 200], [0.5, 1, 0.5]),
      transform: [
        {
          translateX: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-100, 0, 100],
          ),
        },
        {
          translateY: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-50, 0, -50],
          ),
        },
        {
          rotate: `${interpolate(
            offset.value.x,
            [-200, 0, 200],
            [30, 0, -30],
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
    .onUpdate(e => {
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
      console.log('onFinalize', offset.value.x);
      if (offset.value.x < -150) {
        //왼쪽으로 넘어감

        runOnJS(onPressLike)();
      }

      if (offset.value.x > 150) {
        //오른쪽으로 넘어감
        runOnJS(onPressUnLike)();
      }

      offset.value = {
        x: 0,
        y: 0,
      };

      isPressed.value = false;
    });
  useEffect(() => {
    if (dog === null) {
      dispatch(getDog());
    }
  }, [dispatch, dog]);

  const onPressLike = useCallback(() => {
    console.log('onPressLike');
    if (dog !== null) {
      dispatch(likeDog(dog));
      dispatch(getDog());
    }
  }, [dispatch, dog]);

  const onPressUnLike = useCallback(() => {
    dispatch(getDog());
  }, [dispatch]);

  console.log(dog);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {dog !== null && (
          <View
            style={{
              width: 300,
            }}>
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                }}>
                <Animated.View style={animatedStyle}>
                  <RemoteImage url={dog.photoUrl} width={200} height={200} />
                </Animated.View>
              </Animated.View>
            </GestureDetector>
            <Spacer space={64} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 4}}>
                <Button onPress={onPressLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon color="white" name="thumbs-up" size={16} />
                    <Typography fontSize={20} color="white">
                      LIKE
                    </Typography>
                  </View>
                </Button>
              </View>
              <View style={{flex: 1, marginLeft: 4}}>
                <Button onPress={onPressUnLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon color="white" name="thumbs-down" size={16} />

                    <Typography fontSize={20} color="white">
                      NOT LIKE
                    </Typography>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
