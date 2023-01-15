import React, {Component} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ScreenC} from "./ScreenC";

const Stack = createNativeStackNavigator()

export class NestedStackNavigationB extends Component{
    render() {
        return (
            <Stack.Navigator screenOptions={{presentation:'modal'}}>
                <Stack.Screen name={'ScreenC'} component={ScreenC}/>
            </Stack.Navigator>
        )
    }
}

