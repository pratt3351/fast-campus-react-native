import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import auth from '@react-native-firebase/auth';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {}, []);

  const onPressGoogleSignin = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      await GoogleSignin.signOut();
    }
    const result = await GoogleSignin.signIn({});
    console.log(result);

    
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    rootNavigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        tid: authResult.user.uid,
        userEmail: result.user.email,
        userName: result.user.email,
        profileImage: result.user.photo ?? '',
      },
    });
  }, [rootNavigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Intro" />
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: safeAreaInsets.bottom + 32,
        }}>
        <GoogleSigninButton onPress={onPressGoogleSignin} />
        {/* <Button
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
        </Button> */}
      </View>
    </View>
  );
};
