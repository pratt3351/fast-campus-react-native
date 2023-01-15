import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ScreenA} from "./ScreenA";
import {ScreenB} from "./ScreenB";
import {ScreenC} from "./ScreenC";

const Stack = createNativeStackNavigator()

export class NestedStackNavigation extends Component{
    render() {
        return (
            <Stack.Navigator screenOptions={{presentation:'modal'}}>
                <Stack.Screen name={'ScreenC'} component={ScreenC}/>
            </Stack.Navigator>
        )
    }
}
