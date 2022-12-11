import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Header} from '../components/Header/Header';

export const MainScreen: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.5659887,
    longitude: 126.9807672,
  });
  const getMyLocation = useCallback(async () => {
    console.log('?');
    Geolocation.getCurrentPosition(position => {
      console.log(position);

      console.log(position);
      setCurrentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    console.log('useEffect');
    getMyLocation();
  }, [getMyLocation]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>
    </View>
  );
};
