import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigations';

export const CameraScreen: React.FC = () => {
  const navigation = useRootNavigation<'Camera'>();
  const routes = useRootRoute<'Camera'>();
  const ref = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  console.log(device);
  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const onPressTakePhoto = useCallback(async () => {
    const result = await ref.current?.takePhoto();
    console.log(result);
    if (result) {
      routes.params.onTakePhoto(result.path);
      navigation.goBack();
    }
  }, [navigation, routes.params]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 찍기" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={{flex: 1}}>
        <View style={{flex: 2, backgroundColor: 'black'}}>
          {device && (
            <Camera
              ref={ref}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
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
