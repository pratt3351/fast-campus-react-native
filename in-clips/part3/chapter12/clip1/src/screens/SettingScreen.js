import React, {useCallback} from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '../components/Spacer';
export const SettingScreen = ()=>{
    const navigation = useNavigation();

    const onPressBack = useCallback(()=>{
        navigation.goBack();

    }, [])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='SETTING'/>
                </Header.Group>
            </Header>
        </View>
    )
}