import React, {useCallback, useEffect, useRef} from 'react';
import {Platform, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const TakePhotoScreen: React.FC = () => {
  const navigation = useRootNavigation<'TakePhoto'>();
  const routes = useRootRoute<'TakePhoto'>();
  const cameraRef = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const onPressTakePhoto = useCallback(async () => {
    const result = await cameraRef.current?.takePhoto();
    console.log(result);

    if (result) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${
        result.path
      }`;

      await CameraRoll.save(path, {
        type: 'photo',
        album: 'AccountBook',
      });

      routes.params.onTakePhoto(path);

      navigation.goBack();
    }
  }, [routes.params, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 찍기" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={cameraRef}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}
              device={device}
              isActive={true}
              photo
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
