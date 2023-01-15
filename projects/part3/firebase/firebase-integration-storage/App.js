import { useCallback, useState } from 'react';
import { Button, StyleSheet, View, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [lastUploadImage, setLastUploadImage] = useState(null);

  const onPressPickFile = useCallback(async ()=>{
    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality:1,
    })

    if(pickResult.canceled){
      return;
    }

    const image = pickResult.assets[0];
    setSelectedImage(image);

    const uri = image.uri;
    const fileNameArray = uri.split('/');
    const fileName = fileNameArray[fileNameArray.length-1];
    console.log(fileName);

    const putResult = await storage().ref(fileName).putFile(Platform.OS === 'ios' ? uri.replace('file://', '') : uri);
    console.log(putResult);
    setLastUploadImage(putResult);

  }, [])

  const onPressDownloadImage = useCallback(async()=>{

      const downloadUrl = await storage().ref(lastUploadImage.metadata.fullPath).getDownloadURL();

      console.log(downloadUrl);
      const {uri} = await FileSystem.createDownloadResumable(
        downloadUrl,
        FileSystem.documentDirectory + lastUploadImage.metadata.name,
        {}
      ).downloadAsync();
      
      console.log('uri', uri)

  }, [lastUploadImage])
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      {selectedImage !== null && ( 
        <Image source={{uri:selectedImage.uri}} style={{width:200, height:200,}}/>
      )}
  
      <Button title='PICK FILE' onPress={onPressPickFile}></Button>

      <Button title='DOWNLOAD FILE' onPress={onPressDownloadImage}/>
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
