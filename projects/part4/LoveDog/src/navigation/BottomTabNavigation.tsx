import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {TabIcon} from '../components/TabIcon';
import {MainScreen} from '../screens/MainScreen';
import {MyScreen} from '../screens/MyScreen';

export type TypeBottomTabNavigation = {
  Main: undefined;
  My: undefined;
};

const BottomTab = createBottomTabNavigator<TypeBottomTabNavigation>();

export const BottomTabNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen name="Main" component={MainScreen} />
      <BottomTab.Screen name="My" component={MyScreen} />
    </BottomTab.Navigator>
  );
};

export const useBottomTabNavigation = <
  RouteName extends keyof TypeBottomTabNavigation,
>() =>
  useNavigation<BottomTabNavigationProp<TypeBottomTabNavigation, RouteName>>();

export const useBottomTabRoute = <
  RouteName extends keyof TypeBottomTabNavigation,
>() => useRoute<RouteProp<TypeBottomTabNavigation, RouteName>>();
