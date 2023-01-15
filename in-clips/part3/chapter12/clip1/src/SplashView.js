import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Typography } from './components/Typography';

export const SplashView = (props)=>{

    useEffect(()=>{
        props.onFinishLoad();
    }, [])
    
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Typography fontSize={16}>SPLASH</Typography>
        </View>
    )
}