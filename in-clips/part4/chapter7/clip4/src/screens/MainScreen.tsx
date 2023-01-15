import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../components/Header/Header';
import {getAddressFromCoords} from '../utils/GeoUtils';

export const MainScreen: React.FC = () => {
  const safeArea = useSafeAreaInsets();

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

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

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
