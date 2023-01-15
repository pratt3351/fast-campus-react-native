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
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import {Permission} from 'react-native-permissions';
export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const dispatch = useDispatch();

  const safeArea = useSafeAreaInsets();
  const [visibleGoogleSigninBtn, setVisibleGoogleSigninBtn] = useState(true);

  const checkUserLoginOnce = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();

    if (!isSignIn) {
      setVisibleGoogleSigninBtn(true);
      return;
    }

    setVisibleGoogleSigninBtn(false);

    const result = await GoogleSignin.signInSilently();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    const uid = authResult.user.uid;
    const currentTime = new Date();
    const reference = database().ref(`member/${uid}`);

    const lastLoginUserInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());
    const lastLoginDate = new Date(lastLoginUserInfo.lastLoginAt);
    const isLastLoginBeforeOneDay =
      currentTime.getTime() - lastLoginDate.getTime() >= 1000 * 60 * 60 * 24;

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

    const userInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());

    analytics().logLogin({method: 'google'});

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
  }, [dispatch, rootNavigation]);

  const onPressGoogleSignin = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      await GoogleSignin.signOut();
    }

    const result = await GoogleSignin.signIn({});
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    const uid = authResult.user.uid;

    const currentTime = new Date();
    const reference = database().ref(`member/${uid}`);
    const user = await reference.once('value').then(snapshot => snapshot.val());

    if (user !== null) {
      const lastLoginDate = new Date(user.lastLoginAt);
      const isLastLoginBeforeOneDay =
        currentTime.getTime() - lastLoginDate.getTime() >= 1000 * 60 * 60 * 24;

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

      const userInfo = await reference
        .once('value')
        .then(snapshot => snapshot.val());

      dispatch(
        setUser({
          uid: uid,
          userEmail: userInfo.email,
          userName: userInfo.name,
          profileImage: userInfo.profile,
          availableLikeCount: userInfo.availableLikeCount ?? 5,
        }),
      );
      analytics().logLogin({method: 'google'});

      rootNavigation.reset({
        routes: [{name: 'Main'}],
      });

      return;
    }

    rootNavigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        preInput: {
          email: result.user.email,
          name: result.user.name ?? 'Unknown',
          profileImage: result.user.photo ?? '',
        },
        uid: authResult.user.uid,
      },
    });
  }, [dispatch, rootNavigation]);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();

      console.log('Authorization token : ', token);
    }
  }, []);

  useEffect(() => {
    checkUserLoginOnce();
    requestUserPermission();
  }, [checkUserLoginOnce, requestUserPermission]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="IntroScreen" />
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 32 + safeArea.bottom,
        }}>
        {visibleGoogleSigninBtn && (
          <GoogleSigninButton onPress={onPressGoogleSignin} />
        )}
      </View>
    </View>
  );
};
