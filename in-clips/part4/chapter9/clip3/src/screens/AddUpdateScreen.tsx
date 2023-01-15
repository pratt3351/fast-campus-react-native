import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigations';

export const AddUpdateScreen: React.FC = () => {
  const routes = useRootRoute();
  const navigation = useRootNavigation();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={routes.name} />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
    </View>
  );
};
