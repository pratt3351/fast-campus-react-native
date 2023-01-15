import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListItemView} from './ListItemView';
import {TypeListItem} from './TypeListItem';
import {useYotubeData} from './useYotubeData';

export const ListView: React.FC = () => {
  const {data, loadData, loadMoreData} = useYotubeData();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList<TypeListItem>
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
};
