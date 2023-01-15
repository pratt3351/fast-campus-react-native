import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigations';
import {convertToDateString} from '../utils/DateUtils';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();
  const [item, setItem] = useState(routes.params.item);

  const onPressModify = useCallback(() => {
    navigation.push('Update', {
      item: routes.params.item,
      onChangeData: nextItem => {
        console.log(nextItem);

        setItem(nextItem);
      },
    });
  }, [navigation, routes.params.item]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 24, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View>
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
                  fontSize={20}
                  color={item.type === '사용' ? 'white' : 'black'}>
                  사용
                </Typography>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View>
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
                  fontSize={20}
                  color={item.type === '수입' ? 'white' : 'black'}>
                  수입
                </Typography>
              </View>
            </View>
          </View>
        </View>
        {/* 금액 입력 란 추가 */}
        <Spacer space={20} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            // justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                borderColor: item.date === 0 ? 'gray' : 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography fontSize={16} color="gray">
                {item.price}
              </Typography>
            </View>

            <Spacer space={12} />
            <View
              style={{
                borderColor: item.date === 0 ? 'gray' : 'gray',
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
          </View>

          {item.photoUrl !== null && (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                marginLeft: 24,
                backgroundColor: 'lightgray',
              }}>
              <RemoteImage
                url={item.photoUrl}
                width={100}
                height={100}
                style={{
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                }}
              />
            </View>
          )}
        </View>

        <Spacer space={12} />

        <View
          style={{
            borderWidth: 1,
            height: 100,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
          }}>
          <Typography color="black" fontSize={16}>
            {item.comment}
          </Typography>
        </View>

        <Spacer space={64} />

        <Button onPress={onPressModify}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography color={'white'} fontSize={20}>
              {'수정하기'}
            </Typography>
          </View>
        </Button>
        {/* 일시 입력 란 추가 */}
      </ScrollView>
    </View>
  );
};
