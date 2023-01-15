import React from 'react';
import { View, FlatList } from 'react-native';
import { IMAGE_LIST } from '../constants/imageList';
import {Header} from '../components/Header/Header';
import { PhotoListItem } from '../components/PhotoListItem';

export const ImageListScreen = ()=>{

    return (
        <View style={{flex:1, }}>

            <Header>
                <Header.Title title='IMAGE LIST'></Header.Title>
            </Header>
            <FlatList 
                style={{flex:1}}
                data={IMAGE_LIST} 
                renderItem={({item})=>{
                    return (
                        <PhotoListItem url={item} />
                    )
                }}/>
        </View>
    )
}