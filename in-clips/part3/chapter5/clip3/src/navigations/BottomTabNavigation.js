import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {ImageListScreen} from '../screens/ImageListScreen';
import {FavoriteImageScreen} from '../screens/FavoriteImageScreen';
import {TabIcon} from '../components/TabIcon';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigation = ()=>{

    return (
        <BottomTab.Navigator 
            screenOptions={({route})=>({
                headerShown:false,
                tabBarIcon:({focused, color, size})=>{
                    const getIconName = ()=>{

                        if(route.name === 'ImageList')
                            return 'home'

                        if(route.name === 'FavoriteImage')
                            return 'star'
                    }

                    return (
                        <TabIcon iconName={getIconName()} iconColor={focused ? 'tomato' : 'gray'} />
                    )
                },
                tabBarActiveTintColor:'tomato',
                tabBarInactiveTintColor:'gray',
            })}>
            <BottomTab.Screen
                 name='ImageList' 
                 component={ImageListScreen} 
            />
            <BottomTab.Screen 
                name='FavoriteImage' 
                component={FavoriteImageScreen}
            />
        </BottomTab.Navigator>
    )
}