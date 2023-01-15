import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DiaryListScreen } from '../screens/DiaryListScreen';
import { DiaryDetailScreen } from '../screens/DiaryDetailScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { AddPasswordScreen } from '../screens/AddPasswordScreen';
const Stack = createNativeStackNavigator();

export const DiaryStackNavigation = ()=>{

    return (
        <Stack.Navigator
            initialRouteName='DiaryList'
            screenOptions={{
                headerShown:false,
            }}
        >
            <Stack.Screen name='DiaryList' component={DiaryListScreen} />
            <Stack.Screen name='DiaryDetail' component={DiaryDetailScreen}/>
            <Stack.Screen name='Setting' component={SettingScreen}/>

            <Stack.Screen name='AddPassword' component={AddPasswordScreen}/>
        </Stack.Navigator>
    )
}