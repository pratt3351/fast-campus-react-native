import React from 'react';
import {Button} from '../Button';
import {Icon, IconName} from '../Icons';

export const HeaderIcon: React.FC<{
  onPress: () => void;
  iconName: IconName;
}> = props => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.iconName} size={28} color="black" />
    </Button>
  );
};
