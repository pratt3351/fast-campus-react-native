import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {useRootNavigation} from '../navigations/RootNavigations';
const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();
  const safeArea = useSafeAreaInsets();

  const [list] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 100000,
      comment: 'TEST_1',
      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 200000,
      comment: 'TEST_2',
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },

    {
      id: 2,
      type: '수입',
      price: 260000,
      comment: 'TEST_3',
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={() => {
                navigation.push('Detail', {item: item});
              }}
            />
          );
        }}
      />

      <Button
        onPress={() => {
          navigation.push('Add');
        }}>
        <View
          style={[
            {position: 'absolute', right: 12, bottom: 12 + safeArea.bottom},
            {
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Icon name="add" size={30} color="white" />
        </View>
      </Button>
    </View>
  );
};
