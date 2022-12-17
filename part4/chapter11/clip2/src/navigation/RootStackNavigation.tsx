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
import {HistoryListScreen} from '../screens/HistoryListScreen';
import {IntroScreen} from '../screens/IntroScreen';
import {BottomTabNavigation} from './BottomTabNavigation';
import {SignupNavigation, TypeSignupNavigation} from './SignupNavigation';

type TypeRootStackParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
};

const Stack = createNativeStackNavigator<TypeRootStackParams>();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Signup" component={SignupNavigation} />
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="HistoryList" component={HistoryListScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <
  RouteName extends keyof TypeRootStackParams,
>() =>
  useNavigation<NativeStackNavigationProp<TypeRootStackParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof TypeRootStackParams>() =>
  useRoute<RouteProp<TypeRootStackParams, RouteName>>();
