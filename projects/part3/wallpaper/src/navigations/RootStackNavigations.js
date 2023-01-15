import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {BottomTabNavigations} from './BottomTabNavigations'
import { ImageDetailScreen } from '../screen/ImageDetailScreen';
const Stack = createNativeStackNavigator();

export const RootStackNavigations = ()=>{
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown:false
            }}>
            <Stack.Screen name='BottomTab' component={BottomTabNavigations}/>
            <Stack.Screen name='ImageDetail' component={ImageDetailScreen}/>
        </Stack.Navigator>
    )
}