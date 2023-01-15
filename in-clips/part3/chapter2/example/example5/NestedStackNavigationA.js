import React, {Component} from 'react';
import {createStackNavigator} from "@react-navigation/stack"

import {ScreenA} from "./ScreenA";
import {ScreenB} from "./ScreenB";

const Stack = createStackNavigator()

export class NestedStackNavigationA extends Component{
    render() {
        return (
            <Stack.Navigator screenOptions={{presentation:'modal'}}>
                <Stack.Screen name={'ScreenA'} component={ScreenA}/>
                <Stack.Screen name={'ScreenB'} component={ScreenB}/>
            </Stack.Navigator>
        )
    }
}
 
