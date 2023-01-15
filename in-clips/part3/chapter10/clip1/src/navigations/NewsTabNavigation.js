import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteNewsList } from '../screens/FavoriteNewsListScreen';
import { NewsListScreen } from '../screens/NewsListScreen';
import { TabIcon } from '../components/TabIcon';

const BottomTab = createBottomTabNavigator();

export const NewsTabNavigation = ()=>{

    return (
        <BottomTab.Navigator
             screenOptions={(routes)=>({
                headerShown:false,
                tabBarIcon:({color})=>{
                    const getIconName = ()=>{
                        if(routes.route.name === 'NewsList'){
                            return 'home'
                        }

                        if(routes.route.name==='FavoriteNewsList'){
                            return 'star'
                        }
                    }
                    
                    const iconName = getIconName();

                    return (
                        <TabIcon iconName={iconName} iconColor={color}/>
                    )
                }
            })}
        >
            <BottomTab.Screen name='NewsList' component={NewsListScreen}/>
            <BottomTab.Screen name='FavoriteNewsList' component={FavoriteNewsList}/>
        </BottomTab.Navigator>
    )
}