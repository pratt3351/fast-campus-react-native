import React, { useEffect, useMemo } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { FeedInfo } from '../@types/FeedInfo';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { useMyFeedList } from '../selectors/user';
import {useDispatch} from 'react-redux';
import { getMyFeedList, TypeUserDispatch } from '../actions/user';

export const MyPageScreen:React.FC = ()=>{
    const data = useMyFeedList();
    const rootNavigation = useRootNavigation();
    const dispatch = useDispatch<TypeUserDispatch>();
    const {width} = useWindowDimensions();

    const photoSize=useMemo(()=>{
        return width/3
    }, [width])

    useEffect(()=>{
        dispatch(getMyFeedList());
        
    }, [])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='MY PAGE'></Header.Title>
            </Header>

            <FlatList<FeedInfo>
                data={data}
                numColumns={3}
                renderItem={({item})=>{
                    return (
                        <Button onPress={()=>{
                            rootNavigation.navigate('FeedList', {list:data})
                        }}>
                            <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
                        </Button>
                    )
                }}
            />
        </View>
    )
}