import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
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
import ActionSheet from 'react-native-actionsheet';
import {uploadFile} from '../utils/FileUtils';
import database from '@react-native-firebase/database';
export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();
  const routes = useSignupRoute<'InputName'>();
  const actionSheetRef = useRef<ActionSheet | null>(null);

  const safeAreaInsets = useSafeAreaInsets();
  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const [profileImage] = useState(routes.params.profileImage);
  const [inputName, setInputName] = useState(routes.params.userName);
  const isValid = useMemo(() => {
    if (inputName.length === 0) {
      return false;
    }

    return true;
  }, [inputName.length]);

  const onPressProfileImage = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);
  const onPressSubmit = useCallback(async () => {
    if (!isValid) {
      return;
    }
    if (loading) {
      return;
    }

    setLoading(true);

    const getPhotoUrl = async () => {
      if (selectedPhoto) {
        return await uploadFile(selectedPhoto.uri);
      }
      return profileImage;
    };

    const photoUrl = await getPhotoUrl();

    const memberRef = `member/${routes.params.tid}`;

    const reference = database().ref(memberRef);
    const currentTime = new Date();
    await reference.set({
      name: inputName,
      email: routes.params.inputEmail,
      profile: photoUrl,
      regeditAt: currentTime.toISOString(),
      lastLoginAt: currentTime.toISOString(),
    });
    setLoading(false);

    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
  }, [
    inputName,
    isValid,
    loading,
    profileImage,
    rootNavigation,
    routes.params.inputEmail,
    routes.params.tid,
    selectedPhoto,
  ]);
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
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <Typography fontSize={20} color="white">
                회원가입
              </Typography>
            )}
          </View>
          <Spacer space={safeAreaInsets.bottom + 12} />
        </View>
      </Button>

      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '갤러리에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            rootNavigation.push('TakePhoto', {
              onTakePhoto: uri => {
                setSelectedPhoto({uri: uri});
              },
            });
          }
          if (index === 1) {
            ImageCropPicker.openPicker({
              cropping: true,
            }).then(result => {
              console.log(result);
              setSelectedPhoto({uri: result.path});
            });
          }
        }}
      />
    </View>
  );
};
