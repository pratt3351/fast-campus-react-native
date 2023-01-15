import React, {useCallback, useEffect} from 'react';
import {Alert, View} from 'react-native';
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
import {
  ErrorCode,
  PurchaseError,
  useIAP,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';
import {TypeUser} from '../data/TypeUser';
import {userPurchaseItem} from '../actions/user';
import PushNotification from 'react-native-push-notification';
import analytics from '@react-native-firebase/analytics';

export const MainScreen: React.FC = () => {
  const dog = useSelector<RootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );

  const {
    getProducts,
    requestPurchase,
    connected,
    availablePurchases,
    getAvailablePurchases,
    finishTransaction,
    currentPurchase,
  } = useIAP();
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

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: () => {
  //     isPressed.value = true;
  //   },
  //   onActive: e => {
  //     console.log('onUpdate');
  //     offset.value = {
  //       x: e.translationX + start.value.x,
  //       y: offset.value.y,
  //     };
  //   },
  //   onEnd: () => {
  //     if (offset.value.x < -150) {
  //       //왼쪽으로 넘어감
  //       // runOnJS(onSwipeLeft)();
  //       // onSwipeLeft();
  //     }

  //     if (offset.value.x > 150) {
  //       //오른쪽으로 넘어감
  //       // runOnJS(onSwipeLeft)();
  //     }

  //     offset.value = {
  //       x: 0,
  //       y: 0,
  //     };

  //     isPressed.value = false;
  //   },
  // });

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

  const onPressPurchaseItem = useCallback(async () => {
    console.log('connected', connected);
    await getAvailablePurchases();

    console.log(availablePurchases);
    // if (availablePurchases.length > 0) {
    //   //이미 사용한 아이템이 있다면,
    //   //지급

    //   await dispatch(userPurchaseItem());
    //   finishTransaction({
    //     purchase: availablePurchases[0],
    //     isConsumable: true,
    //   });
    //   return;
    // }

    // const result = await getProducts();
    // console.log(result);
    const getProductsList = await getProducts({
      skus: ['com.lovedog.product.5'],
    });

    console.log('getProductsList', getProductsList);

    try {
      await flushFailedPurchasesCachedAsPendingAndroid();

      const purchaseResult = await requestPurchase({
        skus: ['com.lovedog.product.5'],
      });
    } catch (ex) {
      console.error(ex);
    }
  }, [
    availablePurchases,
    connected,
    getAvailablePurchases,
    getProducts,
    requestPurchase,
  ]);

  useEffect(() => {
    console.log(currentPurchase);
    if (currentPurchase) {
      finishTransaction({
        purchase: currentPurchase,
        isConsumable: true,
      });
      dispatch(userPurchaseItem());
    }

    // ... listen to currentPurchase, to check if the purchase went through
  }, [currentPurchase, dispatch, finishTransaction]);

  const onPressLike = useCallback(async () => {
    if (dog !== null) {
      try {
        analytics().logEvent('onPressLike', {dogPhoto: dog.photoUrl});

        PushNotification.createChannel(
          {
            channelId: 'lovedog-channel',
            channelName: 'LoveDog channel',
          },
          created => {
            console.log('created', created);
          },
        );
        PushNotification.localNotificationSchedule({
          channelId: 'lovedog-channel',
          id: new Date(Date.now()).getTime().toString(),
          message: '좋아요를 들어와서 눌러보세요',
          allowWhileIdle: true,
          date: new Date(Date.now() + 5 * 1000), // in 60 secs
          // repeatTime: 1,
          picture: dog.photoUrl,
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
              {
                text: '다음에',
                onPress: () => {},
              },
            ],
          );
        }
      }
    }
  }, [dispatch, dog, onPressPurchaseItem]);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications(item => {
      console.log('!!!!!', item);
    });
  }, []);

  const onPressUnLike = useCallback(() => {
    dispatch(getDog());
  }, [dispatch]);

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
