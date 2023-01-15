import React, {useCallback} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigations';
import KakaoShareLink from 'react-native-kakao-share-link';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

  const onPressKakaoShare = useCallback(() => {
    KakaoShareLink.sendLocation({
      address: routes.params.address,
      addressTitle: routes.params.name,
      content: {
        title: routes.params.name,
        imageUrl:
          'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        description: '이곳 어떤가요 ?',
      },
    });
  }, [routes.params.address, routes.params.name]);

  const onPressShare = useCallback(async () => {
    console.log('onPressShare');

    const link = await dynamicLinks().buildLink({
      link: 'https://testurl.test/',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://favoriterestaurant.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });

    Share.open({
      url: link,
    });

    console.log('link', link);
  }, []);

  return (
    <View>
      <Header>
        <Header.Title title={routes.params.name} />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={{padding: 24}}>
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

        <Spacer space={24} />

        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'yellow',
            }}>
            <Typography fontSize={20}>카카오 공유하기</Typography>
          </View>
        </Button>
        <Spacer space={24} />

        <Button onPress={onPressShare}>
          <View
            style={{
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
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
