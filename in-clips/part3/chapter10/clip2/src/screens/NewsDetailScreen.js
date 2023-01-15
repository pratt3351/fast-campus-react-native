import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';

export const NewsDetailScreen = ()=>{
    const navigation = useNavigation();

    const route = useRoute();
    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer horizontal space={12}/>
                    <View style={{maxWidth:200}}>
                     <Header.Title title={route.params.item.title}/>
                    </View>
                </Header.Group>

                <Header.Icon iconName='heart-outline'/>
            </Header>

            <WebView
                style={{flex:1}}
                source={{uri: route.params.item.link}}
            />
        </View>
    )
}