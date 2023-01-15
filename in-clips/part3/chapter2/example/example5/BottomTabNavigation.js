import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {ScreenE} from "./ScreenE";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NestedBottomTabNavigation} from "./NestedBottomTabNavigation";

const Stack = createNativeStackNavigator();

export class BottomTabNavigation extends Component{
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{presentation:'modal'}}>
                    <Stack.Screen
                        name={'Stack Bottom Tab'}
                        component={NestedBottomTabNavigation}
                    />

                    <Stack.Screen
                        name={'ScreenE'}
                        component={ScreenE}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
