import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { favoriteFeed, TypeFeedListDispatch } from '../actions/feed';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';

export const FeedListScreen:React.FC = ()=>{
    const route = useRootRoute<'FeedList'>();
    const navigation = useRootNavigation<'FeedList'>();
    const dispatch = useDispatch<TypeFeedListDispatch>();

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='FEED LIST'></Header.Title>
                <Header.Icon iconName='close' onPress={()=>{navigation.goBack()}}></Header.Icon>
            </Header>


            <FlatList
                data={route.params.list}
                renderItem={({item})=>{
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            isLiked={false}
                            likeCount={item.likeHistory.length}
                            writer={item.writer.name}
                            createdAt={item.createdAt}
                            onPressFeed={()=>{
                                console.log('onPressFeed')
                            }}     
                            onPressFavorite={()=>{
                                console.log('onPressFavorite');
                                dispatch(favoriteFeed(item));
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