import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenA } from './src/ScreenA';
import { ScreenB } from './src/ScreenB'
import { NestedStackNavigation } from './src/NestedStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabA } from './src/TabA';
import { TabB } from './src/TabB';
import { BottomTabNavigation } from './src/BottomTabNavigator';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


// export default function App() {
//   return (

//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name={'ScreenA'} component={ScreenA}/>
//         <Stack.Screen name='ScreenB' component={ScreenB}/>
//         <Stack.Screen name='NestedNavigator' component={NestedStackNavigation}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'NestedBottomTab'} component={BottomTabNavigation}/>
        <Stack.Screen name='ScreenB' component={ScreenB}/>
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}