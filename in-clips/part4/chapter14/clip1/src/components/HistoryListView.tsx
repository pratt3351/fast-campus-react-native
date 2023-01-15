import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserLikedHistory, TypeUserDispatch} from '../actions/user';
import {TypeDog} from '../data/TypeDog';
import {TypeUser} from '../data/TypeUser';
import {RootReducer} from '../store';
import {Button} from './Button';
import {RemoteImage} from './RemoteImage';
import database from '@react-native-firebase/database';

export const HistoryListView: React.FC<{
  onPressItem: (index: number) => void;
}> = props => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch<TypeUserDispatch>();

  //   const likedList = useSelector<RootReducer, TypeDog[]>(
  //     state => state.user.history,
  //   );
  const user = useSelector<RootReducer, TypeUser | null>(
    state => state.user.user,
  );
  const [likedList, setLikedList] = useState<TypeDog[]>([]);
  const loadLikedList = useCallback(async () => {
    // const user = getState().user.user;
    if (user === null) {
      return;
    }

    const ref = `history/${user.uid}`;
    const refCurrentHistory = await database().ref(ref);

    const currentHistory = await refCurrentHistory
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
      //   dispatch(getUserLikedHistory());
    } catch (ex) {
      console.log(ex);
    }
  }, [dispatch, loadLikedList]);

  return (
    <FlatList<TypeDog>
      data={likedList}
      numColumns={2}
      renderItem={({item, index}) => (
        <Button
          testID={`Button${index}`}
          onPress={() => {
            //   setSelectedIdx(index);
            //   setIsVisible(true);
            props.onPressItem(index);
          }}>
          <RemoteImage
            width={width * 0.5}
            height={width * 0.5}
            url={item.photoUrl}
          />
        </Button>
      )}
    />
  );
};
