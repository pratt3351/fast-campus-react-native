import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../actions/news';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Typography } from '../components/Typography';
import {SingleLineInput} from '../components/SingleLineInput';
import { Divider } from '../components/Divider';
import { useNavigation } from '@react-navigation/native';

export const NewsListScreen = ()=>{
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const newsList = useSelector((state)=> state.news.newsList);
    const navigation = useNavigation();


    return (
        <View style={{flex:1, }}>
            <Header>
                <Header.Title title={'NewsList'}/>
            </Header>
            <View style={{flex:1}}>
                <View style={{paddingHorizontal:24, paddingVertical:12,}}>
                    <SingleLineInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder='뉴스 겁색어를 입력해 주세요'
                        onSubmitEditing={()=>{
                            if(query === '') return;

                            dispatch(getNewsList(query))
                        }}
                    />
                </View>

                <FlatList
                    style={{flex:1}}
                    data={newsList}
                    ItemSeparatorComponent={()=>(
                        <Divider/>
                    )}
                    renderItem={({item})=>{
                        return (
                            <Button onPress={()=>{
                                navigation.navigate('NewsDetail', {item})
                            }}>
                                <View style={{flex:1, paddingHorizontal:20, paddingVertical:8}}>
                                    <Typography fontSize={24} numberOfLines={1}>{item.title}</Typography>
                                    <Typography fontSize={16} numberOfLines={2} color='gray'>{item.description}</Typography>
                                </View>
                            </Button>
                        )
                    }}
                />
            </View>
        </View>
    )
}