import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {AccountBookHisotry} from '../data/AccountBookHistory';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';
import {useRootNavigation} from '../navigations/RootNavigation';

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const {getList, getMontlyAverage} = useAccountBookHistoryItem();

  const [list, setList] = useState<AccountBookHisotry[]>([]);
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);

  const fetchList = useCallback(async () => {
    const data = await getList();
    setList(data);
    const monthlyAverage = await getMontlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMontlyAverage]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main SCREEN" />
      </Header>

      <FlatList
        data={list}
        ListHeaderComponent={
          <Button onPress={() => navigation.push('MonthlyAverage')}>
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography fontSize={16} color="gray">
                이번달 총 사용금액
              </Typography>

              <Spacer space={12} />
              <Typography fontSize={24}>
                {average[average.length - 1].data[0].toString()} 원
              </Typography>

              <Spacer space={32} />

              <Typography fontSize={16} color="gray">
                이번달 총 수입금액
              </Typography>
              <Spacer space={12} />
              <Typography fontSize={24}>
                {average[average.length - 1].data[1].toString()} 원
              </Typography>
            </View>
          </Button>
        }
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={clicked => {
                navigation.push('Detail', {item: clicked});
              }}
            />
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <Button
          onPress={() => {
            navigation.push('Add');
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" size={30} color="white" />
          </View>
        </Button>
        <View />
      </View>
    </View>
  );
};
