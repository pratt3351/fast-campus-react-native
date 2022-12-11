import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const DetailScreen: React.FC = () => {
  return (
    <View>
      <Header>
        <Header.Title title="Detail" />
      </Header>
    </View>
  );
};
