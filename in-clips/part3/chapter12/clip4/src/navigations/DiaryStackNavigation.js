import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiaryListScreen } from '../screens/DiaryListScreen';
import { DiaryDetailScreen } from '../screens/DiaryDetailScreen';
import { SettingScreen } from '../screens/SettingScreen';
const Stack = createNativeStackNavigator();

export const DiaryStackNavigation = ()=>{

    return (
        <Stack.Navigator 
            initialRouteName='DiaryList'
            screenOptions={{
                headerShown:false,
            }}>
            <Stack.Screen name='DiaryList' component={DiaryListScreen}></Stack.Screen>
            <Stack.Screen name='DiaryDetail' component={DiaryDetailScreen}></Stack.Screen>
            <Stack.Screen name='Setting' component={SettingScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}