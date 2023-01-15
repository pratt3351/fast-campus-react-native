import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TotalFeedListScreen } from '../screens/TotalFeedListScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { TabIcon } from '../components/TabIcon';
import { TypeIconName } from '../components/Icons';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigation = ()=>{

    return (
        <BottomTab.Navigator screenOptions={({route})=>{
            const getIconName = ():TypeIconName=>{
                if(route.name === 'MyPage'){
                    return 'person'
                }

                return 'home'
            }

            const routeIconName = getIconName();

            return {
                headerShown:false,
                tabBarIcon:({color})=>{
                    return (
                        <TabIcon iconName={routeIconName} iconColor={color}/>
                    )
                }
            }
        }}>
            <BottomTab.Screen name='TotalFeedList' component={TotalFeedListScreen}></BottomTab.Screen>
            <BottomTab.Screen name='MyPage' component={MyPageScreen}></BottomTab.Screen>
        </BottomTab.Navigator>
    )
}