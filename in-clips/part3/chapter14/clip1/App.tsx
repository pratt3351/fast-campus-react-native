import React from 'react';
import { View } from 'react-native';
import { FeedListItem } from './src/components/FeedListItem';

export default function App() {
  return (
    <View style={{flex:1}}>
      <FeedListItem
        image='https://docs.expo.dev/static/images/tutorial/background-image.png'
        likeCount={10}
        writer='Pratt Yeon'
        comment='Test Comment!'
        onPressFeed={()=>{
          console.log('feed clicked')
        }}
      />
    </View>
  );
}
