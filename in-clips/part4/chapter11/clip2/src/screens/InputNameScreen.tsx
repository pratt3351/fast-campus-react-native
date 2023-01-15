import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Input Name" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            rootNavigation.replace('Main');
          }}
          paddingHorizontal={24}
          paddingVertical={12}>
          <Typography fontSize={24}>회원가입 완료</Typography>
        </Button>
      </View>
    </View>
  );
};
