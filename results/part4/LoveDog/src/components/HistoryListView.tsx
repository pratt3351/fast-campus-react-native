import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TypeUserDispatch} from '../actions/user';
import {TypeDog} from '../data/TypeDog';
import {TypeUser} from '../data/TypeUser';
import {TypeRootReducer} from '../store';
import database from '@react-native-firebase/database';
import {Button} from './Button';
import {RemoteImage} from './RemoteImage';

export const HistoryListView: React.FC<{
  onPressItem: (index: number) => void;
}> = props => {
  const {width} = useWindowDimensions();

  const dispatch = useDispatch<TypeUserDispatch>();
  //   const likedList = useSelector<TypeRootReducer, TypeDog[]>(
  //     state => state.user.history,
  //   );
  const user = useSelector<TypeRootReducer, TypeUser | null>(
    state => state.user.user,
  );

  const [likedList, setLikedList] = useState<TypeDog[]>([]);

  const loadLikedList = useCallback(async () => {
    if (user === null) {
      return;
    }

    const ref = `history/${user.uid}`;

    const currentHistory = await database()
      .ref(ref)
      .once('value')
      .then(snapshot => snapshot.val());

    const dogList = Object.keys(currentHistory).map(key => {
      const item = currentHistory[key];

      return {
        photoUrl: item.url,
      } as TypeDog;
    });

    setLikedList(dogList);
  }, [user]);

  useEffect(() => {
    try {
      loadLikedList();
    } catch (ex) {
      console.log(ex);
    }
  }, [dispatch, loadLikedList]);

  return (
    <FlatList<TypeDog>
      data={likedList}
      numColumns={2}
      renderItem={({item, index}) => {
        return (
          <Button
            testID={`Button${index}`}
            onPress={() => {
              props.onPressItem(index);
            }}>
            <RemoteImage
              width={width * 0.5}
              height={width * 0.5}
              url={item.photoUrl}
            />
          </Button>
        );
      }}
    />
  );
};
