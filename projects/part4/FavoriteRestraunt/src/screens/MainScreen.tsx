import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SingleLineInput} from '../components/SingleLineInput';
import {useRootNavigation} from '../navigation/RootNavigation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils';
import {getRestrauntList} from '../utils/RealTimeDataBaseUtils';

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();

  //latitude : 37.560214 longitude: 126.9775521
  const [query, setQuery] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [markerList, setMarketList] = useState<
    {latitude: number; longitude: number; title: string; address: string}[]
  >([]);

  const [currontRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => Promise<void>
  >(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const keywordResult = await getCoordsFromKeyword(query);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult.latitude.toString()),
        longitude: parseFloat(keywordResult.longitude.toString()),
      });
      return;
    }
    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못햇습니다.');
      return;
    }

    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult.latitude.toString()),
      longitude: parseFloat(addressResult.longitude.toString()),
    });
  }, [query]);

  const onPressBottomAddress = useCallback(() => {
    if (currentAddress === null) {
      return;
    }
    navigation.push('Add', {
      latitude: currontRegion.latitude,
      longitude: currontRegion.longitude,
      address: currentAddress,
    });
  }, [
    currentAddress,
    currontRegion.latitude,
    currontRegion.longitude,
    navigation,
  ]);

  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    const restrauntList = await getRestrauntList();
    setMarketList(restrauntList);
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currontRegion.latitude,
          longitude: currontRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onMapReady={onMapReady}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}>
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: currontRegion.latitude,
              longitude: currontRegion.longitude,
            }}
          />
        )}

        {isMapReady &&
          markerList.map(item => {
            return (
              <Marker
                title={item.title}
                description={item.address}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                pinColor="blue"
                onCalloutPress={() => {
                  navigation.push('Detail', {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    address: item.address,
                    title: item.title,
                  });
                }}
              />
            );
          })}
      </MapView>

      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해 주세요"
            onChangeText={setQuery}
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
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={onPressBottomAddress}
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
