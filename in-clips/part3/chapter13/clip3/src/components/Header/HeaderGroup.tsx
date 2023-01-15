import React, { ReactElement } from 'react';
import { View } from 'react-native';

export const HeaderGroup:React.FC<{
    children:ReactElement[]
}> = (props) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {props.children}
  </View>
);
