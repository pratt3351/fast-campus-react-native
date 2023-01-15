import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const TotalFeedListScreen:React.FC = ()=>{

    return (
        <View style={{flex:1,}}>
            <Header>
                <Header.Group>
                    <Header.Title title='TOTAL HEADER'></Header.Title>
                </Header.Group>
            </Header>
        </View>
    )
}