import React from 'react';
import { View, FlatList } from 'react-native';
import { PhotoListItem } from '../components/PhotoListItem';
import { Header } from '../components/Header/Header';
import { useSelector } from 'react-redux';

export const FavoriteImageScreen = ()=>{
    const imageList = useSelector((state)=> state.favorite.favorite)
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FAVORITE'></Header.Title>
            </Header>
            <FlatList 
                style={{flex:1}}
                data={imageList} 
                renderItem={({item})=>{
                    return (
                        <PhotoListItem url={item} />
                    )
                }}/>
        </View>
    )
}