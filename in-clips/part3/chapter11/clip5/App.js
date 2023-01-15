import { useCallback, useState } from 'react';
import { Button, Text, StyleSheet, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [selectedImage, setSelected] = useState(null);
  const [lastUploadedImage, setLastUploadedImage] = useState(null);


  const onPressedUploadImage = useCallback(async()=>{
      const pickResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        quality:1,
      })

      console.log('pickResult', pickResult)
      if(pickResult.canceled){
        return;
      }

      const image = pickResult.assets[0];
      setSelected(image);
      const uri = image.uri;
      const fileNameArray = uri.split('/');
      const fileName = fileNameArray[fileNameArray.length -1];
      console.log(fileName);


      const putResult = await storage().ref(fileName).putFile(Platform.OS === 'ios' ? uri.replace('file://', ''): uri);
      console.log(putResult);

      setLastUploadedImage(putResult);

  }, [])

  const onPressDownloadImage = useCallback(async()=>{
      const downloadUrl = await storage().ref(lastUploadedImage.metadata.fullPath).getDownloadURL();
      console.log(downloadUrl);

      const {uri} = await FileSystem.createDownloadResumable(
        downloadUrl, 
        FileSystem.documentDirectory + lastUploadedImage.metadata.name,
        {},
      ).downloadAsync();

      console.log('url', uri)
  }, [lastUploadedImage])
  return (
    <View style={styles.container}>
      {selectedImage !== null &&(
        <Image source={{uri: selectedImage.uri}} style={{width:200, height:200}}/>
      )}
      <Button title='UPLOAD IMAGE' onPress={onPressedUploadImage}/>

      <Button title='DOWNLOAD IMAGE' onPress={onPressDownloadImage} disabled={lastUploadedImage === null}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
