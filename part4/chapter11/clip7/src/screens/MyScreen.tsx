import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const MyScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Main'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="My" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            rootNavigation.push('HistoryList');
          }}
          paddingHorizontal={24}
          paddingVertical={12}>
          <Typography fontSize={24}>리스트 화면으로 이동</Typography>
        </Button>
      </View>
    </View>
  );
};
