import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AccountBookHisotry} from '../data/AccountBookHistory';
import {AddUpdateScreen} from '../screens/AddUpdateScreen';
import {CalenderSelectScreen} from '../screens/CalenderSelectScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {MainScreen} from '../screens/MainScreen';
import {MonthlyScreen} from '../screens/MonthlyScreen';
import {TakePhotoScreen} from '../screens/TakePhotoScreen';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: {
    item: AccountBookHisotry;
    onChangeData: (nextItem: AccountBookHisotry) => void;
  };
  Detail: {item: AccountBookHisotry};
  MonthlyAverage: undefined;
  CalenderSelect: {onSelectDay: (date: number) => void};
  TakePhoto: {onTakePhoto: (url: string) => void};
};

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="CalenderSelect" component={CalenderSelectScreen} />
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
