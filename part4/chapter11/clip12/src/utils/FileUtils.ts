import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

export const uploadFile = async (localUri: string): Promise<string> => {
  const fileNameList = localUri.split('/');
  const fileName = fileNameList[fileNameList.length - 1];

  const uploadFileUrl = await storage()
    .ref(fileName)
    .putFile(Platform.OS === 'ios' ? localUri.replace('file://', '') : localUri)
    .then(result => storage().ref(result.metadata.fullPath).getDownloadURL());

  return uploadFileUrl;
};
