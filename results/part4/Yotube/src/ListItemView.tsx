import React from 'react';
import {Image, Text, View} from 'react-native';
import {TypeListItem} from './TypeListItem';

export const ListItemView: React.FC<{item: TypeListItem}> = props => {
  return (
    <View style={{}}>
      <Image
        style={{height: 200}}
        resizeMode="cover"
        source={{uri: props.item.thumbnail}}
      />
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 16}}>{props.item.title}</Text>
        <Text style={{fontSize: 12}}>
          {props.item.channelTitle} · 조회수 {props.item.viewCount} {' · '}
          {props.item.publishedAt}
        </Text>
      </View>
    </View>
  );
};
