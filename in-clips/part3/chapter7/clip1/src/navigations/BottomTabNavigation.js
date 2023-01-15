import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryListScreen } from '../screens/HistoryListScreen';
import {TabIcon} from '../components/TabIcon';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = ()=>{
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarIcon:({focused, color, size})=>{
                const getIconName = ()=>{

                    if(route.name === 'Home')
                        return 'home'

                    if(route.name === 'History')
                        return 'time'
                }

                return (
                    <TabIcon iconName={getIconName()} iconColor={focused ? 'tomato' : 'gray'} />
                )
            },

        })}>
            <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='History' component={HistoryListScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}