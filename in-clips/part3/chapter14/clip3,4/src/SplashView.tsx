import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn, TypeUserDispatch } from './actions/user';
import { Typography } from './components/Typography';

export const SplashView:React.FC<{onFinishLoad:()=>void}> = (props)=>{
    const dispatch = useDispatch<TypeUserDispatch>();
    const appInit = useCallback(async()=>{
        await dispatch(signIn());
        props.onFinishLoad();
        
    }, [])
    useEffect(()=>{
        appInit();

    }, [])
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Typography fontSize={48}>SPLASH VIEW</Typography>
        </View>
    )
}