import React from 'react';
import {View} from 'react-native';
import {Typography} from '../components/Typography'
import {Header} from '../components/Header/Header';

export const HomeScreen = (props)=>{

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='HOME'></Header.Title>
                </Header.Group>
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Typography fontSize={20}>HOME SCREEN</Typography>
            </View>
        </View>
    )
}