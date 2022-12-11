import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SingleLineInput} from '../components/SingleLineInput';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils';

export const MainScreen: React.FC = () => {
  const safeArea = useSafeAreaInsets();

  const [inputText, setInputText] = useState('');

  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 37.5659887,
    longitude: 126.9807672,
    latitudeDelta: 0.003,
    longitudeDelta: 0.0025,
  });

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const getMyLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position);

      console.log(position);
      setCurrentRegion(prevState => {
        return {
          ...prevState,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });

      getAddressFromCoords(
        position.coords.latitude,
        position.coords.longitude,
      ).then(setCurrentAddress);
    });
  }, []);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => {}
  >(async item => {
    setCurrentRegion(prevState => {
      return {
        ...prevState,
        latitude: item.latitude,
        longitude: item.longitude,
      };
    });

    getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const keywordResult = await getCoordsFromKeyword(inputText);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion(prevState => {
        return {
          ...prevState,
          latitude: keywordResult.latitude,
          longitude: keywordResult.longitude,
        };
      });
      setInputText('');

      return;
    }

    getCoordsFromAddress(inputText).then(result => {
      if (result === null) {
        console.log('주소를 찾지 못했습니다.');
        return;
      }
      setCurrentAddress(result.address);
      setCurrentRegion(prevState => {
        return {
          ...prevState,
          latitude: result.latitude,
          longitude: result.longitude,
        };
      });
      setInputText('');
    });
  }, [inputText]);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={currentRegion}
        onRegionChangeComplete={event => {
          console.log(event);
          setCurrentRegion({
            latitude: event.latitude,
            longitude: event.longitude,
            latitudeDelta: event.latitudeDelta,
            longitudeDelta: event.longitudeDelta,
          });
        }}
        onLongPress={event => {
          console.log(event.nativeEvent.coordinate);
          onChangeLocation(event.nativeEvent.coordinate);
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>

      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={inputText}
            placeholder="주소를 입력해 주세요"
            onChangeText={value => {
              console.log('value', value);
              setInputText(value);
            }}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {currentAddress !== null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24 + safeArea.bottom,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
