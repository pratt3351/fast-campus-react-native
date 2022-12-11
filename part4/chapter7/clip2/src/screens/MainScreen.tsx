import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {Header} from '../components/Header/Header';

export const MainScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

      <MapView
        style={{flex: 1}}
        region={{
          latitude: 37.5659887,
          longitude: 126.9807672,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};
