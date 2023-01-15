import React, {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TypeDog} from '../data/TypeDog';
import {RemoteImage} from './RemoteImage';
import {api} from '../utils/AxiosUtils';
export const DogPhotoView: React.FC = () => {
  const [dog, setDog] = useState<TypeDog | null>(null);
  const {width} = useWindowDimensions();

  const loadDogPhoto = useCallback(async () => {
    const apiResult = await api.get<{
      message: string;
      status: string;
    }>('breeds/image/random');
    const result = apiResult.data;

    setDog({photoUrl: result.message});
  }, []);

  useEffect(() => {
    loadDogPhoto();
  }, [loadDogPhoto]);

  if (dog === null) {
    return null;
  }

  return (
    <RemoteImage
      testID="image"
      url={dog.photoUrl}
      width={width * 0.7}
      height={width * 0.7}
    />
  );
};
