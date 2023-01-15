import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';

export const DiaryDetailScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();

    const {width} = useWindowDimensions();
    const photoSize = useMemo(()=>{
        return {
            photoWidth:width,
            photoHeight:width * 0.5,
        }
    }, [width])
    const date = useMemo(()=> {
        return new Date(route.params.item.date )
    }, [route.params.item])


    const onPressBack = useCallback(()=>{
        navigation.goBack();

    }, [])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}></Header.Icon>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='DIARY DETAIL'></Header.Title>
                </Header.Group>
            </Header>

            <ScrollView style={{flex:1}}>
                {typeof route.params.item.photoUrl !== 'undefined' && (
                    <RemoteImage 
                        url={route.params.item.photoUrl }
                        width={photoSize.photoWidth}
                        height={photoSize.photoHeight}
                    />
                )}
                <Spacer space={20}/>

                <View style={{
                    flexDirection:'row', 
                    paddingHorizontal:24, 
                    paddingVertical:12,
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <Typography fontSize={20}>날짜</Typography>
                    <Typography fontSize={16}>
                        {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}
                    </Typography>
                </View>

                <Spacer space={40}/>

                <View style={{paddingHorizontal:24,}}>
                    <Typography fontSize={32}>{route.params.item.title}</Typography>
                    <Typography fontSize={24}>{route.params.item.content}</Typography>
                </View>
            </ScrollView>
        </View>
    )
}