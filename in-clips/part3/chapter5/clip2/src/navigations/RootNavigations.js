import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {BottomTabNavigation} from './BottomTabNavigation';
import { ImageDetailScreen } from '../screens/ImageDetailScreen';
const Stack = createNativeStackNavigator();

export const RootNavigation = ()=>{

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='BottomTab' component={BottomTabNavigation}/>
            <Stack.Screen name='ImageDetail' component={ImageDetailScreen}/>
        </Stack.Navigator>
    )

}