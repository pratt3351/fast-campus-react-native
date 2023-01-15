import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {MultiLineInput} from '../components/MultiLineInput';
import {RemoteImage} from '../components/RemoteImage';
import {SingleLineInput} from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {AccountBookHisotry} from '../data/AccountBookHistory';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {convertToDateString} from '../utils/DateUtils';

export const AddUpdateScreen: React.FC = () => {
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const routes = useRootRoute<'Add' | 'Update'>();

  const {insertItem, updateItem} = useAccountBookHistoryItem();

  const [item, setItem] = useState<AccountBookHisotry>(
    routes.params?.item ?? {
      type: '사용',
      price: 0,
      comment: '',
      date: 0,
      createdAt: 0,
      updatedAt: 0,
      photoUrl: null,
    },
  );

  const onPressType = useCallback<(type: AccountBookHisotry['type']) => void>(
    type => {
      if (routes.name === 'Update') {
        return;
      }
      setItem(prevItem => {
        return {
          ...prevItem,
          type: type,
        };
      });
    },
    [routes.name],
  );

  const onChangePrice = useCallback<(text: string) => void>(text => {
    setItem(prevState => ({
      ...prevState,
      price: parseInt(text),
    }));
  }, []);

  const onChangeComment = useCallback<(text: string) => void>(text => {
    setItem(prevState => ({
      ...prevState,
      comment: text,
    }));
  }, []);

  const onPressPhoto = useCallback(() => {
    navigation.push('TakePhoto', {
      onTakePhoto: url => {
        console.log(url);

        setItem(prevState => ({
          ...prevState,
          photoUrl: url,
        }));
      },
    });
  }, [navigation]);

  const onPressCalandar = useCallback(() => {
    navigation.push('CalenderSelect', {
      onSelectDay: date => {
        setItem(prevState => ({
          ...prevState,
          date: date,
        }));
      },
    });
  }, [navigation]);

  const onPressSave = useCallback(() => {
    if (routes.name === 'Add') {
      insertItem(item).then(() => navigation.goBack());
    }

    if (routes.name === 'Update') {
      updateItem(item).then(updatedItem => {
        routes.params?.onChangeData(updatedItem);

        navigation.goBack();
      });
    }
  }, [routes.name, routes.params, insertItem, item, navigation, updateItem]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Add/Update SCREEN" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                onPressType('사용');
              }}>
              <View
                style={{
                  backgroundColor: item.type === '사용' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}>
                <Typography
                  fontSize={16}
                  color={item.type === '사용' ? 'white' : 'black'}>
                  사용
                </Typography>
              </View>
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                onPressType('수입');
              }}>
              <View
                style={{
                  backgroundColor: item.type === '수입' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Typography
                  fontSize={16}
                  color={item.type === '수입' ? 'white' : 'black'}>
                  수입
                </Typography>
              </View>
            </Button>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <SingleLineInput
              value={item.price === 0 ? '' : item.price.toString()}
              placeholder="금액을 입력해 주세요"
              onChangeText={onChangePrice}
              keyboardType="number-pad"
              fontSize={16}
            />

            <Spacer space={24} />

            <Button onPress={onPressCalandar}>
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                }}>
                <Typography
                  fontSize={16}
                  color={item.date === 0 ? 'lightgray' : 'gray'}>
                  {item.date !== 0
                    ? convertToDateString(item.date)
                    : '날짜를 선택하세요'}
                </Typography>
              </View>
            </Button>
          </View>

          <View style={{marginLeft: 24}}>
            <Button onPress={onPressPhoto}>
              {item.photoUrl ? (
                <RemoteImage
                  url={item.photoUrl}
                  width={100}
                  height={100}
                  style={{borderRadius: 12}}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 12,
                    backgroundColor: 'lightgray',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="add" size={24} color="gray" />
                </View>
              )}
            </Button>
          </View>
        </View>

        <Spacer space={24} />
        <MultiLineInput
          value={item.comment}
          height={100}
          onChangeText={onChangeComment}
          placeholder="어떤 일인가요?"
          onSubmitEditing={() => {}}
        />

        <Spacer space={64} />

        <Button onPress={onPressSave}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography color="white" fontSize={16}>
              {routes.name === 'Add' ? '저장하기' : '수정하기'}
            </Typography>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};
