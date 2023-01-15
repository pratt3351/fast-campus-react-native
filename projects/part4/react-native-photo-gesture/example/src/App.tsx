import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { GesturePhotoView, multiply } from 'react-native-photo-gesture';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  // React.useEffect(() => {
  //   multiply(3, 7).then(setResult);
  // }, []);

  return (
    <View style={styles.container}>
      <GesturePhotoView
        url="https://docs.expo.dev/static/images/tutorial/background-image.png"
        photoWidth={300}
        photoHeight={300}
        onGesture={(direction) => {
          console.log('direction', direction)
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
