import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {HistoryListScreen} from '../screens/HistoryListScreen';
import {IntroScreen} from '../screens/IntroScreen';
import {TakePhotoScreen} from '../screens/TakePhotoScreen';
import {TypeRootReducer} from '../store';
import {BottomTabNavigation} from './BottomTabNavigation';
import {SignupNavigation, TypeSignupNavigation} from './SignupNavigation';

export type TypeRootStackNavigationParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator<TypeRootStackNavigationParams>();

export const RootStackNavigation: React.FC = () => {
  const isSignIn = useSelector<TypeRootReducer, boolean>(
    state => state.user.user !== null,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      {!isSignIn && <Stack.Screen name="Signup" component={SignupNavigation} />}
      {isSignIn && (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigation} />
          <Stack.Screen name="HistoryList" component={HistoryListScreen} />
        </>
      )}
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() =>
  useNavigation<
    NativeStackNavigationProp<TypeRootStackNavigationParams, RouteName>
  >();

export const useRootRoute = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() => useRoute<RouteProp<TypeRootStackNavigationParams, RouteName>>();
