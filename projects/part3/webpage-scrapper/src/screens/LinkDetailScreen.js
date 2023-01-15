import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';

export const LinkDetailScreen = ()=>{
    const routes = useRoute();

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
                    <Header.Title title='LINK DETAIL'></Header.Title>
                </Header.Group>
            </Header>

            <WebView
                style={{flex:1}}
                source={{uri:routes.params.item.link}}
            />
        </View>
    )
}