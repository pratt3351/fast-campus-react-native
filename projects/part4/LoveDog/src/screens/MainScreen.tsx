import React, {useCallback, useEffect} from 'react';
import {Alert, useWindowDimensions, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Purchase, useIAP} from 'react-native-iap';
import PushNotification from 'react-native-push-notification';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import {getDog, likeDog, TypeDogDispatch} from '../actions/dog';
import {userPurchaseItem} from '../actions/user';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {TypeDog} from '../data/TypeDog';
import {TypeRootReducer} from '../store';

import analytics from '@react-native-firebase/analytics';

export const MainScreen: React.FC = () => {
  const {width} = useWindowDimensions();

  const dog = useSelector<TypeRootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );

  const dispatch = useDispatch<TypeDogDispatch>();
  const {
    requestPurchase,
    getProducts,
    getAvailablePurchases,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  const onPressPurchaseItem = useCallback(async () => {
    await getAvailablePurchases();

    await getProducts({
      skus: ['com.lovedog.product.10'],
    });

    try {
      await requestPurchase({skus: ['com.lovedog.product.10']});
    } catch (ex) {
      console.error(ex);
    }
  }, [getAvailablePurchases, getProducts, requestPurchase]);
  // key id  : WH8B6P4M2Q
  const userPurchasedItem = useCallback(
    async (purchase: Purchase) => {
      try {
        await dispatch(userPurchaseItem());

        finishTransaction({
          purchase: purchase,
          isConsumable: true,
        });
      } catch (ex) {}
    },
    [dispatch, finishTransaction],
  );

  useEffect(() => {
    if (currentPurchase) {
      userPurchasedItem(currentPurchase);
    }
  }, [currentPurchase, userPurchasedItem]);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications(item => {
      console.log('!!!!!', item);
    });
  }, []);

  const onPressLike = useCallback(async () => {
    if (dog === null) {
      return;
    }
    analytics().logEvent('onPressLike', {dogPhoto: dog.photoUrl});

    try {
      PushNotification.createChannel(
        {
          channelId: 'lovedog-channel',
          channelName: 'Love Dog Channel',
        },
        created => {
          console.log('created', created);
        },
      );

      PushNotification.requestPermissions();

      PushNotification.localNotificationSchedule({
        channelId: 'lovedog-channel',
        message: '좋아요를 들어와서 눌러보세요',
        allowWhileIdle: true,
        date: new Date(Date.now() + 5 * 1000),
        picture: dog.photoUrl,
        repeatTime: 1,
      });
      await dispatch(likeDog(dog));
      dispatch(getDog());
    } catch (ex) {
      console.error(ex);

      const error = ex as Error;

      if (error.message === 'Like Today Count is Over') {
        Alert.alert(
          '구매가 필요합니다',
          '더 많은 강아지 사진을 좋아요 하려면 구매를 해주세요',
          [
            {
              text: '구매하기',
              onPress: onPressPurchaseItem,
            },
            {text: '다음에'},
          ],
        );
      }
    }
  }, [dispatch, dog, onPressPurchaseItem]);

  const onPressNotLike = useCallback(() => {
    dispatch(getDog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {})
    .onUpdate(event => {
      offset.value = {
        x: event.translationX + start.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      if (offset.value.x < -150) {
        //왼쪽으로 넘어간 상태

        runOnJS(onPressLike)();
      }

      if (offset.value.x > 150) {
        runOnJS(onPressNotLike)();
      }

      offset.value = {
        x: 0,
        y: 0,
      };
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
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

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MainScreen" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {dog !== null && (
          <View style={{width: width * 0.85}}>
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={animatedStyle}>
                  <RemoteImage
                    url={dog.photoUrl}
                    width={width * 0.7}
                    height={width * 0.7}
                  />
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
                    <Icon name="thumbs-up" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      LIKE
                    </Typography>
                  </View>
                </Button>
              </View>

              <View style={{flex: 1, marginLeft: 4}}>
                <Button onPress={onPressNotLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon name="thumbs-down" color="white" size={16} />
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
