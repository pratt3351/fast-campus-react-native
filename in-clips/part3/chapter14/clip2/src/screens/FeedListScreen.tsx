import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const FeedListScreen:React.FC = ()=>{

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FEED LIST'></Header.Title>
            </Header>
        </View>
    )
}