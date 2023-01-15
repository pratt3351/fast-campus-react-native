import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NestedStackNavigationA} from "./NestedStackNavigationA";
import {NestedStackNavigationB} from "./NestedStackNavigationB";
import {Ionicons} from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator()

export class NestedBottomTabNavigation extends React.Component {

    render() {
        return (
            <BottomTab.Navigator>
                <BottomTab.Screen
                    name={'TabA'}
                    component={NestedStackNavigationA}
                    options={{tabBarIcon:()=><Ionicons name={'home'} size={30} />}}
                />
                <BottomTab.Screen
                    name={'TabB'}
                    component={NestedStackNavigationB}
                    options={{tabBarIcon:()=><Ionicons name={'settings'} size={30} />}}
                />
            </BottomTab.Navigator>
        )
    }
}
