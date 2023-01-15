import React from 'react';
import {Button} from '../Button';
import {Icon, TypeIconName} from '../Icons';

export const HeaderIcon: React.FC<{
  onPress: () => void;
  iconName: TypeIconName;
}> = props => (
  <Button onPress={props.onPress}>
    <Icon name={props.iconName} size={28} color="black" />
  </Button>
);
