import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NewsTabNavigation } from './NewsTabNavigation';
import { NewsDetailScreen } from '../screens/NewsDetailScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigation = ()=>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}>
            <Stack.Screen name='NewsTab' component={NewsTabNavigation}/>
            <Stack.Screen name='NewsDetail' component={NewsDetailScreen}/>
        </Stack.Navigator>
    )
}