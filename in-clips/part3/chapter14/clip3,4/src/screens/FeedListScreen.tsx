import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FeedInfo } from '../@types/FeedInfo';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';

export const FeedListScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'FeedList'>();
    const route = useRootRoute();

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
                            comment={item.content}
                            likeCount={item.likeCount}
                            writer={item.writer}
                            onPressFeed={()=>{
                                console.log('onPressFeed')
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