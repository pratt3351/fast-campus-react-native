import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {InputEmailScreen} from '../screens/InputEmailScreen ';
import {InputNameScreen} from '../screens/InputNameScreen';

export type TypeSignupNavigation = {
  InputEmail: {
    tid: string;
    userEmail: string;
    userName: string;
    profileImage: string;
  };
  InputName: {
    tid: string;
    userEmail: string;
    userName: string;
    profileImage: string;
    inputEmail: string;
  };
};

const Stack = createNativeStackNavigator<TypeSignupNavigation>();

export const SignupNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="InputEmail" component={InputEmailScreen} />
      <Stack.Screen name="InputName" component={InputNameScreen} />
    </Stack.Navigator>
  );
};

export const useSignupNavigation = <
  RouteName extends keyof TypeSignupNavigation,
>() =>
  useNavigation<NativeStackNavigationProp<TypeSignupNavigation, RouteName>>();

export const useSignupRoute = <
  RouteName extends keyof TypeSignupNavigation,
>() => useRoute<RouteProp<TypeSignupNavigation, RouteName>>();
