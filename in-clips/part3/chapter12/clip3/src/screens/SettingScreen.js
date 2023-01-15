import React, {useCallback} from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '../components/Spacer';
import { useRecoilState, useRecoilValue } from 'recoil';
import {stateUserInfo } from '../states/stateUserInfo';
import { RemoteImage } from '../components/RemoteImage';
import { Typography } from '../components/Typography';
import {useImagePickAndUpload} from '../hooks/useImagePickAndUpload';
import { Button } from '../components/Button';
import database from '@react-native-firebase/database'
export const SettingScreen = ()=>{
    const [userInfo, setUserInfo] = useRecoilState(stateUserInfo)
    const navigation = useNavigation();
    const runImagePickAndUpload = useImagePickAndUpload(false);


    const onPressBack = useCallback(()=>{
        navigation.goBack();

    }, [])

    const onPressProfile = useCallback(async()=>{
        const result = await runImagePickAndUpload();
        console.log(result);

        if(result.length===1){
            const userDB = `/users/${userInfo.uid}`;

            setUserInfo((prevState)=>{
                return {
                    ...prevState,
                    profileImage:result[0]
                }
            })
            
            await database().ref(userDB).update({
                profileImage:result[0]
            })
        }
    }, [runImagePickAndUpload])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='SETTING'/>
                </Header.Group>
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Button onPress={onPressProfile}>
                        <RemoteImage
                            url={userInfo.profileImage}
                            width={100}
                            height={100}
                            style={{borderRadius:100}}
                            />
                    </Button>
                    <Spacer space={20}/>
                    <Typography fontSize={20}>{userInfo.name}</Typography>
                </View>
            </View>
            
        </View>
    )
}