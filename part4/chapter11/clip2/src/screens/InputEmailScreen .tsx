import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';

export const InputEmailScreen: React.FC = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Input Email" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            navigation.push('InputName', {
              tid: routes.params.tid,
              userEmail: routes.params.userEmail,
              userName: routes.params.userName,
              profileImage: routes.params.profileImage,
              inputEmail: 'INPUT_VALUE',
            });
          }}
          paddingHorizontal={24}
          paddingVertical={12}>
          <Typography fontSize={24}>다음 화면으로 이동하기</Typography>
        </Button>
      </View>
    </View>
  );
};
