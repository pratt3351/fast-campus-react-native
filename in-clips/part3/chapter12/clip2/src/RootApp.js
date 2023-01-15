import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { RootStackNavigation } from './navigations/RootStackNavigation';
import { SplashView } from './SplashView';

export const RootApp = ()=>{
    const [init, setInit] = useState(false);

    if(!init){
        return (
            <SplashView
                onFinishLoad={()=> {setInit(true)}}
            />
        )
    }
    
    return (
        <NavigationContainer>
            <RootStackNavigation/>
        </NavigationContainer>
    )
}