import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { favoriteFeed, TypeFeedListDispatch } from '../actions/feed';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';
import { useMyInfo } from '../selectors/user';

export const FeedListScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'FeedList'>();
    const route = useRootRoute();
    const dispatch = useDispatch<TypeFeedListDispatch>();
    const myInfo = useMyInfo();



    const onPressBack = useCallback(()=>{
        rootNavigation.goBack();
    }, [])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FEED LIST'></Header.Title>

                <Header.Icon iconName='close' onPress={onPressBack}/>
            </Header>

            <FlatList<FeedInfo>
                data={route.params?.list ?? []}
                renderItem={({item})=>{
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            isLiked={item.likeHistory.filter((item)=> myInfo?.uid === item).length>0}
                            comment={item.content}
                            likeCount={item.likeCount}
                            writer={item.writer.name}
                            onPressFeed={()=>{
                                console.log('onPressFeed')
                            }}
                            onPressFavorite={()=>{
                                console.log('onPessFavorite')
                                dispatch(favoriteFeed(item))
                            }}
                        />
                    )
                }}
                ItemSeparatorComponent={()=>(
                    <Spacer space={24}/>
                )}
            />
        </View>
    )
}