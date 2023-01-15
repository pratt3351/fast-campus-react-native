import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {SingleLineInput} from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';

import * as EmailValidator from 'email-validator';

export const InputEmailScreen: React.FC = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();
  const safeAreaInsets = useSafeAreaInsets();

  const [inputEmail, setInputEmail] = useState<string>(routes.params.userEmail);
  const isValid = useMemo(() => {
    if (inputEmail.length === 0) {
      return false;
    }

    return EmailValidator.validate(inputEmail);
  }, [inputEmail]);
  const onPressSubmit = useCallback(() => {
    if (!isValid) {
      return;
    }

    navigation.push('InputName', {
      tid: routes.params.tid,
      userEmail: routes.params.userEmail,
      userName: routes.params.userName,
      profileImage: routes.params.profileImage,
      inputEmail: inputEmail,
    });
  }, [
    inputEmail,
    navigation,
    isValid,
    routes.params.profileImage,
    routes.params.tid,
    routes.params.userEmail,
    routes.params.userName,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Input Email" />
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <SingleLineInput
          value={inputEmail}
          onChangeText={setInputEmail}
          placeholder="Email을 입력해 주세요"
          onSubmitEditing={onPressSubmit}
          keyboardType="email-address"
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color="white">
              다음
            </Typography>
          </View>
          <Spacer space={safeAreaInsets.bottom + 12} />
        </View>
      </Button>
    </View>
  );
};
