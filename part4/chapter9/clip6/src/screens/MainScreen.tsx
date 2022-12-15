import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';
import {useRootNavigation} from '../navigations/RootNavigations';
const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();
  const safeArea = useSafeAreaInsets();
  const {getItem} = useAccountBookHistoryItem();

  const [list, setList] = useState<AccountBookHistory[]>([]);

  const fetchData = useCallback(async () => {
    const data = await getItem();
    setList(data);
  }, [getItem]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={() => {
                navigation.push('Detail', {item: item});
              }}
            />
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeArea.bottom,
        }}>
        <Button
          onPress={() => {
            console.log('??');
            navigation.push('Add');
          }}>
          <View
            style={[
              {
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon name="add" size={30} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};
