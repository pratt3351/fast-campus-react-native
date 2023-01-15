import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

export const AddScreen: React.FC = () => {
  return (
    <View>
      <Header>
        <Header.Title title="ADD" />
      </Header>
    </View>
  );
};
