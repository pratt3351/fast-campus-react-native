import React, { useCallback } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { Typography } from '../components/Typography';
import { Header } from '../components/Header/Header';
import { IMAGE_LIST } from '../constants/imageList';
import { PhotoListItem } from '../components/PhotoListItem';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Spacer } from '../components/Spacer';
import { RemoteImage } from '../components/RemoteImage';

export const ImageDetailScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();


    const onPressBack = useCallback ( ()=>{
        navigation.goBack();

    }, [navigation])

    console.log(route);

    const {width} = useWindowDimensions();


    return (
        <View style={{flex:1}}>

            <Header>
                <Header.Group>

                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='DETAIL'></Header.Title>

                </Header.Group>
            </Header>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <RemoteImage url={route.params.url} width={width} height={width * 1.5} />
            </View>


        </View>
    )
}