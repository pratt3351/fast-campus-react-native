import React from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {convertToDateString} from '../utils/DateUtils';

const today = new Date();
today.setHours(0);
today.setMinutes(0);

export const CalenderSelectScreen: React.FC = () => {
  const navigation = useRootNavigation<'CalenderSelect'>();
  const routes = useRootRoute<'CalenderSelect'>();

  console.log(convertToDateString(today.getTime()));
  console.log(today.toLocaleDateString());
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <Calendar // Initially visible month. Default = now
        // initialDate={convertToDateString(today.getDate())}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);

          routes.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
        maxDate={convertToDateString(today.getTime())}
      />
    </View>
  );
};
