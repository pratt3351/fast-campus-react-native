import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";
import database from '@react-native-firebase/database';
import { useRecoilValue } from "recoil";
import { stateUserInfo } from "../states/stateUserInfo";
import { PasswordInputBox } from "../components/PasswordInputBox";
export const AddPasswordScreen = ()=>{
    const navigation = useNavigation();
    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [])
    const [firstInput, setFirstInput] = useState('')
    const [secondInput, setSecondInput] = useState('');

    const [isFirstInput , setIsFirstInput] = useState(true);
    const userInfo = useRecoilValue(stateUserInfo);

    const onCompleteInputPassword = useCallback(async()=>{

        console.log(firstInput, secondInput);

        if(firstInput !== secondInput){
            return;
        }
       const userDB = `/users/${userInfo.uid}`;

       try{
           await database().ref(userDB).update({
               password:firstInput
           })

       }catch(ex){
            console.log(ex);
       }

       navigation.goBack();


    }, [firstInput, secondInput, userInfo])


    useEffect(()=>{
        if(firstInput.length < 4) return;

        if(secondInput.length < 4) return;

        if(firstInput === secondInput){
            onCompleteInputPassword()
        }
    }, [firstInput, secondInput])


    return (
        <View style={{flex:1, }}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}></Header.Icon>
                    <Spacer space={20} horizontal/>
                   <Header.Title title='비밀번호 추가'></Header.Title>
                </Header.Group>
            </Header>

            <View style={{flex:1,}}>
           
                <View style={{flex:1, paddingBottom:320, justifyContent:'center'}}>
                    <PasswordInputBox
                        value={isFirstInput ? firstInput : secondInput}
                        onChangeText={(text)=>{
                            if(isFirstInput){
                                setFirstInput(text)
                                if(text.length === 4){
                                    setIsFirstInput(false);
                                }
                            } else {
                                setSecondInput(text);
                            }
                        }}
                    />
                </View>

            </View>
        </View>
    )
}