import { useCallback } from "react"
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'
export const useImagePickAndUpload = (allowsEditing)=>{


    return useCallback(async()=>{

        const imagePickResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing,
        })

        if(imagePickResult.canceled) return [];

        const pickPhotoUri = imagePickResult.assets.map((item)=> {
            const uri = item.uri;
            const fileNameArray = uri.split('/');
            const fileName = fileNameArray[fileNameArray.length -1];

            return {
                uri:uri,
                fileName
            }
        });

        const putResultList = await Promise.all(
            pickPhotoUri.map((item)=>{
                return storage().ref(item.fileName)
                        .putFile(Platform.OS === 'ios' ? item.uri.replace('file://', ''): item.uri)
                        .then((result)=> storage().ref(result.metadata.fullPath).getDownloadURL())
                        // .then((result)=> {
                            // return storage()
                        // })
        }))

        console.log(putResultList);

        //uri의 list
        return putResultList;
    }, [])
}