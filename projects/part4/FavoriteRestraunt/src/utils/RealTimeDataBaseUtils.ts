import database from '@react-native-firebase/database';
export const saveNewRestraunt = async (params: {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  const db = database().ref('/restraunt');
  const saveItem = {
    title: params.title,
    address: params.address,
    latitude: params.latitude,
    longitude: params.longitude,
  };

  await db.push().set({
    ...saveItem,
  });
};

export const getRestrauntList = async (): Promise<
  {title: string; address: string; latitude: number; longitude: number}[]
> => {
  const db = database().ref('/restraunt');
  const snapshotValue = await db.once('value').then(snapshot => snapshot.val());

  return Object.keys(snapshotValue).map(key => snapshotValue[key]);
};
