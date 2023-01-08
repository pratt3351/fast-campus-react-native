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
import {RootReducer} from '../store';
import {
  BottomTabNavigation,
  TypeBottomTabsScreenParams,
} from './BottomTabNavigation';
import {SignupNavigation, TypeSignupNavigation} from './SignupNavigation';

export type TypeRootStackParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: NavigatorScreenParams<TypeBottomTabsScreenParams>;
  HistoryList: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator<TypeRootStackParams>();

export const RootStackNavigation: React.FC = () => {
  const isSignIn = useSelector<RootReducer, boolean>(
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
  RouteName extends keyof TypeRootStackParams,
>() =>
  useNavigation<NativeStackNavigationProp<TypeRootStackParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof TypeRootStackParams>() =>
  useRoute<RouteProp<TypeRootStackParams, RouteName>>();
