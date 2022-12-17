import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const safeAreaInsets = useSafeAreaInsets();
  const [visibleGoogleSignin, setVisibleGoogleSignin] = useState(false);

  const checkUserLoginOnce = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();

    console.log('isSignIn', isSignIn);
    if (!isSignIn) {
      setVisibleGoogleSignin(true);
      return;
    }

    setVisibleGoogleSignin(false);

    const result = await GoogleSignin.signInSilently();

    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    const uid = authResult.user.uid;
    const memberRef = `member/${uid}`;

    const reference = await database().ref(memberRef);
    const currentTime = new Date();
    await reference.update({
      lastLoginAt: currentTime.toISOString(),
    });

    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
  }, [rootNavigation]);

  useEffect(() => {
    checkUserLoginOnce();
  }, [checkUserLoginOnce]);

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

      {visibleGoogleSignin && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: safeAreaInsets.bottom + 32,
          }}>
          <GoogleSigninButton onPress={onPressGoogleSignin} />
        </View>
      )}
    </View>
  );
};
