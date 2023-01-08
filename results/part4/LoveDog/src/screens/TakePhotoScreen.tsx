import React, {useCallback, useEffect, useRef} from 'react';
import {Platform, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {
  useRootNavigation,
  useRootRoute,
} from '../navigation/RootStackNavigation';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const TakePhotoScreen: React.FC = () => {
  const routes = useRootRoute<'TakePhoto'>();
  const navigation = useRootNavigation<'TakePhoto'>();
  const devices = useCameraDevices();
  const device = devices.back;
  const ref = useRef<Camera>(null);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const onPressTakePhoto = useCallback(async () => {
    const result = await ref.current?.takePhoto();
    if (result) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${
        result.path
      }`;

      CameraRoll.save(path, {type: 'photo', album: 'LoveDog'});

      routes.params.onTakePhoto(path);
      navigation.goBack();
    }
    console.log(result);
  }, [navigation, routes.params]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 촬영" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={ref}
              style={{flex: 1}}
              device={device}
              isActive={true}
              photo={true}
            />
          )}
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button onPress={onPressTakePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};
