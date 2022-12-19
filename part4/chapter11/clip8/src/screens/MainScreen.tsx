import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDog, likeDog, TypeDogDispatch} from '../actions/dog';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {TypeDog} from '../data/TypeDog';
import {RootReducer} from '../store';

export const MainScreen: React.FC = () => {
  const dog = useSelector<RootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );
  const dispatch = useDispatch<TypeDogDispatch>();

  useEffect(() => {
    if (dog === null) {
      dispatch(getDog());
    }
  }, [dispatch, dog]);

  const onPressLike = useCallback(async () => {
    if (dog !== null) {
      await dispatch(likeDog(dog));
      dispatch(getDog());
    }
  }, [dispatch, dog]);

  const onPressUnLike = useCallback(() => {
    dispatch(getDog());
  }, [dispatch]);

  console.log(dog);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {dog !== null && (
          <View
            style={{
              width: 300,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <RemoteImage url={dog.photoUrl} width={200} height={200} />
            </View>
            <Spacer space={64} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 4}}>
                <Button onPress={onPressLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon color="white" name="thumbs-up" size={16} />
                    <Typography fontSize={20} color="white">
                      LIKE
                    </Typography>
                  </View>
                </Button>
              </View>
              <View style={{flex: 1, marginLeft: 4}}>
                <Button onPress={onPressUnLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon color="white" name="thumbs-down" size={16} />

                    <Typography fontSize={20} color="white">
                      NOT LIKE
                    </Typography>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
