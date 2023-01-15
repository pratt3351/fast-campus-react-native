import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const FavoriteNewsList = ()=>{
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title={'FavoriteNewsList'}/>
            </Header>
        </View>
    )
}