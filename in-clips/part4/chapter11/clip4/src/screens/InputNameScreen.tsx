import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {SingleLineInput} from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {useSignupRoute} from '../navigation/SignupNavigation';

export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();
  const routes = useSignupRoute<'InputName'>();

  const safeAreaInsets = useSafeAreaInsets();
  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState(routes.params.profileImage);
  const [inputName, setInputName] = useState(routes.params.userName);
  const isValid = useMemo(() => {
    if (inputName.length === 0) {
      return false;
    }

    return true;
  }, [inputName.length]);

  const onPressProfileImage = useCallback(() => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(result => {
      console.log(result);
      setSelectedPhoto({uri: result.path});
    });
  }, []);
  const onPressSubmit = useCallback(() => {}, []);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Input Name" />
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <Button onPress={onPressProfileImage}>
          <View style={{width: 100, height: 100}}>
            {profileImage !== '' ? (
              <>
                <RemoteImage
                  width={100}
                  height={100}
                  url={
                    selectedPhoto !== null ? selectedPhoto.uri : profileImage
                  }
                  style={{borderRadius: 50}}
                />
                <View style={{position: 'absolute', right: 0, bottom: 0}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="add" size={16} color="white" />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="add" size={32} color={'black'} />
              </View>
            )}
          </View>
        </Button>
        <Spacer space={32} />
        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력해 주세요"
          onSubmitEditing={onPressSubmit}
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color="white">
              회원가입
            </Typography>
          </View>
          <Spacer space={safeAreaInsets.bottom + 12} />
        </View>
      </Button>
    </View>
  );
};
