import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {GoogleSigninButton, GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import { stateUserInfo } from './states/stateUserInfo';
import {useSetRecoilState} from'recoil';
import { useGetDiaryList } from './hooks/useGetDiaryList';

export const SplashView = (props)=>{
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);
    const setUserInfo = useSetRecoilState(stateUserInfo);

    const runGetDiaryList=useGetDiaryList();



    const signinGoogleFinished = useCallback(async (idToken)=>{
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const result = await auth().signInWithCredential(googleCredential);

        console.log(result);
        const userDB = `/users/${result.user.uid}`;


        // const userResult = await (await database().ref(`/users/${result.user.uid}`).once('value')).val();
        const userResult = await database().ref(userDB).once('value').then((snapshot)=>{
            console.log(snapshot)
            return snapshot.val();
        })

        console.log(userResult);

        const now = new Date().toISOString();


        if(userResult === null){
            //유저를 만들어 줘야 함
            await database().ref(userDB).set({
                name:result.additionalUserInfo.profile.name,
                profileImage:result.additionalUserInfo.profile.picture,
                uid:result.user.uid,
                password:'',
                createdAt:now,
                lastLoginAt:now
            })
        }else {
            await database().ref(userDB).update({
                lastLoginAt:now
            })
        }

        const userInfo = await database().ref(userDB).once('value').then((snapshot)=>{
            console.log(snapshot)
            return snapshot.val();
        })
        setUserInfo(userInfo);

        try{
            await runGetDiaryList(userInfo);

        }catch(ex){
            console.log(ex);

        }




        props.onFinishLoad();

    }, [])
    const checkUserSilentLogin = useCallback(async()=>{
        try{
            const {idToken} = await GoogleSignin.signInSilently();
            signinGoogleFinished(idToken);

        }catch(ex){
            setShowGoogleLogin(true);
            if(error.code === statusCodes.SIGN_IN_REQUIRED){

            }
        }
    }, [])

    const onPressGoogleLogin = useCallback(async()=>{
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const {idToken} = await GoogleSignin.signIn();
        signinGoogleFinished(idToken);


    }, [])

    useEffect(()=>{
        checkUserSilentLogin();

    })
    
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {showGoogleLogin && ( <GoogleSigninButton onPress={onPressGoogleLogin} />)}
        </View>
    )
}