import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AddScreen} from '../screens/AddScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {MainScreen} from '../screens/MainScreen';

type ScreenParms = {
  Main: undefined;
  Add: {latitude: number; longitude: number; address: string};
  Detail: {latitude: number; longitude: number; address: string; title: string};
};

const Stack = createNativeStackNavigator<ScreenParms>();

export const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      {/* <Stack.Screen */}
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParms>() =>
  useNavigation<NativeStackNavigationProp<ScreenParms, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParms>() =>
  useRoute<RouteProp<ScreenParms, RouteName>>();
