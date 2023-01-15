import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabA} from "./TabA";
import {TabB} from "./TabB";
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator()

export class BottomTabNavigation extends Component{
    render() {
        return (
            <NavigationContainer>
                <BottomTab.Navigator>
                    <BottomTab.Screen
                        name={'TabA'}
                        component={TabA}
                        options={{tabBarIcon:()=><Ionicons name={'home'} size={20} />}}
                    />
                    <BottomTab.Screen
                        name={'TabB'}
                        component={TabB}
                        options={{tabBarIcon:()=><Ionicons name={'settings'} size={20} />}}
                    />
                </BottomTab.Navigator>
            </NavigationContainer>
        )
    }
}
