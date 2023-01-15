import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const MainScreen: React.FC = () => {
  return (
    <View>
      <Header>
        <Header.Title title="MAIN" />
      </Header>
    </View>
  );
};
