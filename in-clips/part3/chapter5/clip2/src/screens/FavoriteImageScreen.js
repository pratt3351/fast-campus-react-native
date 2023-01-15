import React from 'react';
import { View } from 'react-native';
import { Typography } from '../components/Typography';
import { Header } from '../components/Header/Header';

export const FavoriteImageScreen = ()=>{

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FAVORITE'></Header.Title>
            </Header>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                <Typography fontSize={20} color='black'>
                    FAVORITE IMAGE SCREEN
                </Typography>
            </View>
        </View>
    )
}