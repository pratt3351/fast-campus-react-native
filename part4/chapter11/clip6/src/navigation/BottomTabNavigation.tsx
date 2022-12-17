import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {TabIcon} from '../components/TabIcon';
import {MainScreen} from '../screens/MainScreen';
import {MyScreen} from '../screens/MyScreen';

type TypeBottomTabs = {
  Main: undefined;
  My: undefined;
};

const BottomTabs = createBottomTabNavigator<TypeBottomTabs>();

export const BottomTabNavigation: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => {
        const getIconName = (): string => {
          if (route.name === 'My') {
            return 'person';
          }

          return 'home';
        };

        const routeIconName = getIconName();

        return {
          headerShown: false,
          tabBarIcon: ({color}) => {
            return (
              <TabIcon
                visibleBadge={false}
                iconName={routeIconName}
                iconColor={color}
              />
            );
          },
        };
      }}>
      <BottomTabs.Screen name="Main" component={MainScreen} />
      <BottomTabs.Screen name="My" component={MyScreen} />
    </BottomTabs.Navigator>
  );
};

export const useBotomTabNavigation = <
  RouteName extends keyof TypeBottomTabs,
>() => useNavigation<BottomTabNavigationProp<TypeBottomTabs, RouteName>>();

export const useBottomTabRoute = <RouteName extends keyof TypeBottomTabs>() =>
  useRoute<RouteProp<TypeBottomTabs, RouteName>>();
