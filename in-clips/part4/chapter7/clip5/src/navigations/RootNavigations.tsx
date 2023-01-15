import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddScreen} from '../screens/AddScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {MainScreen} from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

export const RootNavigations: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
