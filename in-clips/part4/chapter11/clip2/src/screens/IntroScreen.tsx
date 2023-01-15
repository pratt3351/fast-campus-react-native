import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Intro" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            rootNavigation.push('Signup', {
              screen: 'InputEmail',
              params: {
                tid: '',
                userEmail: 'test@test.com',
                userName: 'test',
                profileImage: '',
              },
            });
          }}
          paddingHorizontal={24}
          paddingVertical={12}>
          <Typography fontSize={24}>회원가입 화면으로 이동하기</Typography>
        </Button>

        <Button
          onPress={() => {
            rootNavigation.replace('Main');
          }}
          paddingHorizontal={24}
          paddingVertical={12}>
          <Typography fontSize={24}>홈으로 이동하기</Typography>
        </Button>
      </View>
    </View>
  );
};
