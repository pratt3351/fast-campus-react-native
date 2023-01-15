import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
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
  const {getItem, getMonthlyAverage} = useAccountBookHistoryItem();
  const {width} = useWindowDimensions();
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);

  const [list, setList] = useState<AccountBookHistory[]>([]);

  const fetchData = useCallback(async () => {
    const data = await getItem();
    setList(data);

    const averageResult = await getMonthlyAverage();
    setAverage(averageResult);
  }, [getItem, getMonthlyAverage]);

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
        ListHeaderComponent={
          average.length > 0 ? (
            <View>
              <StackedBarChart
                data={{
                  labels: average.map(item => `${item.month}월`),
                  legend: ['사용', '수입'],
                  data: average.map(item => item.data),
                  barColors: ['#dfe4ea', '#a4b0be'],
                }}
                hideLegend
                width={width}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
              />
            </View>
          ) : undefined
        }
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
