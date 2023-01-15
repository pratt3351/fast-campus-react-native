import React, {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {Header} from '../components/Header/Header';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';

export const MonthlyScreen: React.FC = () => {
  const {getMontlyAverage} = useAccountBookHistoryItem();
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);
  const {width} = useWindowDimensions();

  const getAverage = useCallback(async () => {
    const result = await getMontlyAverage();
    setAverage(result);
  }, [getMontlyAverage]);

  useEffect(() => {
    getAverage();
  }, [getAverage]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Monthly SCREEN" />
        <Header.Icon iconName="close" onPress={() => {}} />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'gray',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
};
