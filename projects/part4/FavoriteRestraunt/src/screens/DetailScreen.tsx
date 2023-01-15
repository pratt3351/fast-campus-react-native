import React, {useCallback} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';
import KakaoShareLink from 'react-native-kakao-share-link';
import Share from 'react-native-share';

import dynamicLinks from '@react-native-firebase/dynamic-links';
export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

  const onPressKakaoShare = useCallback(() => {
    KakaoShareLink.sendLocation({
      address: routes.params.address,
      addressTitle: routes.params.title,
      content: {
        title: routes.params.title,
        imageUrl:
          'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        description: '이곳은 어떤가요 ? ',
      },
    });
  }, [routes.params.address, routes.params.title]);

  const onPressShare = useCallback(async () => {
    const link = await dynamicLinks().buildShortLink({
      link: 'https://testurl.test/',
      domainUriPrefix: 'https://favoriterestraunt.page.link',
    });

    Share.open({
      url: link,
    });
    console.log('link', link);
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>

      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.title}</Typography>

        <Spacer space={24} />

        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.address}</Typography>

        <Spacer space={24} />
        <Typography fontSize={16}>위치</Typography>
        <Spacer space={8} />
        <MapView
          style={{height: 200}}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>

        <Spacer space={48} />

        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="black">
              카카오 공유하기
            </Typography>
          </View>
        </Button>

        <Spacer space={12} />
        <Button onPress={onPressShare}>
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              공유하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
