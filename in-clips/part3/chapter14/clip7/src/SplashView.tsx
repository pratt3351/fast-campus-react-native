import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn, TypeUserDispatch } from './actions/user';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
export const SplashView:React.FC<{onFinishLoad:()=>void}> = (props)=>{
    const dispatch = useDispatch<TypeUserDispatch>();
    const [showLoginButton, setShowLoginButton] = useState(false);

    const appInit = useCallback(async()=>{
        // await dispatch(signIn());
        // props.onFinishLoad();
        try{
            const {idToken} = await GoogleSignin.signInSilently();
            if(idToken !== null)
                await dispatch(signIn(idToken));
            props.onFinishLoad();
        }catch(ex){
            setShowLoginButton(true)
        }
    }, [])

    const onPressSigninButton = useCallback(async()=>{
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog:true,
        })

        const {idToken} = await GoogleSignin.signIn();
        if(idToken !== null)
            await dispatch(signIn(idToken));
        props.onFinishLoad();
    }, [])
    useEffect(()=>{
        appInit();

    }, [])
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {showLoginButton && (
                <>
                    <GoogleSigninButton onPress={onPressSigninButton}/>
                </>
            )}
        </View>
    )
}