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
import {useDispatch} from 'react-redux';
import {setUser} from '../actions/user';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const dispatch = useDispatch();

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

    try {
      const result = await GoogleSignin.signInSilently();

      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const authResult = await auth().signInWithCredential(googleCredential);

      const uid = authResult.user.uid;
      const memberRef = `member/${uid}`;

      const reference = await database().ref(memberRef);
      const currentTime = new Date();

      //TODO 여기 추가됨
      const lastLoginUserInfo = await reference
        .once('value')
        .then(snapshot => snapshot.val());

      const lastLoginDate = new Date(lastLoginUserInfo.lastLoginAt);
      const isLastLoginBeforeOneDay =
        currentTime.getTime() - lastLoginDate.getTime() >= 1000 * 60 * 60 * 24;

      console.log(
        currentTime.getTime() - lastLoginDate.getTime(),
        isLastLoginBeforeOneDay,
      );
      if (isLastLoginBeforeOneDay) {
        await reference.update({
          availableLikeCount: 5,
          lastLoginAt: currentTime.toISOString(),
        });
      } else {
        await reference.update({
          lastLoginAt: currentTime.toISOString(),
        });
      }

      //여기까지
      const userInfo = await reference
        .once('value')
        .then(snapshot => snapshot.val());

      console.log(userInfo);

      dispatch(
        setUser({
          uid: uid,
          userEmail: userInfo.email,
          userName: userInfo.name,
          profileImage: userInfo.profile,
          availableLikeCount: userInfo.availableLikeCount ?? 5,
        }),
      );
      rootNavigation.reset({
        routes: [{name: 'Main'}],
      });
    } catch (ex) {
      setVisibleGoogleSignin(true);
    }
  }, [dispatch, rootNavigation]);

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
