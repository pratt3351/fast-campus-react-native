import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {ListItemView} from './ListItemView';
import {TypeListItem} from './TypeListItem';

export const ListView: React.FC = () => {
  const [list, setList] = useState<TypeListItem[]>([
    {
      title: 'TITLE_01',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      profile:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2022-01-01',
      viewCount: 100,
      channelTitle: 'CHANNEL_TITLE_01',
    },
    {
      title: 'TITLE_02',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      profile:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2022-01-01',
      viewCount: 200,
      channelTitle: 'CHANNEL_TITLE_02',
    },
    {
      title: 'TITLE_03',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      profile:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2022-01-01',
      viewCount: 300,
      channelTitle: 'CHANNEL_TITLE_03',
    },
  ]);
  return (
    <FlatList<TypeListItem>
      data={list}
      renderItem={({item}) => <ListItemView item={item} />}
    />
  );
};
