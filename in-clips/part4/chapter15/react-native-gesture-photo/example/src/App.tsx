import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { GesturePhotoView } from 'react-native-gesture-photo';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <GesturePhotoView
        photoHeight={200}
        photoWidth={200}
        url="https://docs.expo.dev/static/images/tutorial/background-image.png"
        onGesture={(direction) => {
          console.log(direction);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
