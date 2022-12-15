import React from 'react';
import {View} from 'react-native';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {convertToDateString} from '../utils/DateUtils';
import {Button} from './Button';
import {Icon} from './Icons';
import {RemoteImage} from './RemoteImage';
import {Spacer} from './Spacer';
import {Typography} from './Typography';

export const AccountHistoryListItemView: React.FC<{
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}> = props => {
  return (
    <Button onPress={() => props.onPressItem(props.item)}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name={props.item.type === '사용' ? 'remove-circle' : 'add-circle'}
          size={20}
          color={props.item.type === '사용' ? 'red' : 'blue'}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Typography fontSize={16}>{props.item.comment}</Typography>
          <Spacer space={4} />
          <Typography fontSize={12}>
            {convertToDateString(props.item.date)}
          </Typography>
        </View>

        {props.item.photoUrl !== null && (
          <RemoteImage
            url={props.item.photoUrl}
            width={50}
            height={50}
            style={{borderRadius: 10}}
          />
        )}
      </View>
    </Button>
  );
};
