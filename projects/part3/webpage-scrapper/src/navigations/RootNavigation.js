import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LinkStackNavigation } from './LinkStackNavigation';
import { AddLinkScreen } from '../screens/AddLinkScreen';

const Stack = createNativeStackNavigator();

export const RootNavigation = ()=>{

    return (
        <Stack.Navigator
            initialRouteName='LinkStack'
            screenOptions={{
                presentation:'containedModal',
                headerShown:false,
            }}
        >
            <Stack.Screen name='LinkStack' component={LinkStackNavigation}/>
            <Stack.Screen name= 'AddLink' component={AddLinkScreen}/>
        </Stack.Navigator>        
    )
}