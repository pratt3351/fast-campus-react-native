import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {ListItemView} from './ListItemView';
import {useYotubeData} from './useYotubeData';

export const ListView: React.FC = () => {
  const {data, loadData, loadMoreData} = useYotubeData();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
};
