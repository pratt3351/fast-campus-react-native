import React, {useEffect, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserLikedHistory, TypeUserDispatch} from '../actions/user';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {RemoteImage} from '../components/RemoteImage';
import {TypeDog} from '../data/TypeDog';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {TypeRootReducer} from '../store';

import IamgeView from 'react-native-image-viewing';

export const HistoryListScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'HistoryList'>();
  const {width} = useWindowDimensions();

  const dispatch = useDispatch<TypeUserDispatch>();
  const likedList = useSelector<TypeRootReducer, TypeDog[]>(
    state => state.user.history,
  );
  const [visible, setVisible] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    dispatch(getUserLikedHistory());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="HistoryListScreen" />
        <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
      </Header>

      <FlatList<TypeDog>
        data={likedList}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <Button
              onPress={() => {
                setVisible(true);
                setSelectedIdx(index);
              }}>
              <RemoteImage
                width={width * 0.5}
                height={width * 0.5}
                url={item.photoUrl}
              />
            </Button>
          );
        }}
      />
      <IamgeView
        images={likedList.map(item => ({uri: item.photoUrl}))}
        imageIndex={selectedIdx}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};
