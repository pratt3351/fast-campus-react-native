import React, {useCallback, useEffect, useState} from 'react';
import {TypeDog} from '../data/TypeDog';
import {api} from '../utils/AxiosUtils';
import {RemoteImage} from './RemoteImage';

export const DogPhotoView: React.FC = () => {
  const [dog, setDog] = useState<TypeDog | null>(null);

  const loadDogPhoto = useCallback(async () => {
    const apiResult = await api
      .get<{
        message: string;
        status: string;
      }>('/breeds/image/random')
      .then(result => result.data);

    setDog({photoUrl: apiResult.message});
  }, []);

  useEffect(() => {
    loadDogPhoto();
  }, [loadDogPhoto]);

  if (dog === null) {
    return null;
  }
  return (
    <RemoteImage id={'image'} url={dog.photoUrl} width={100} height={100} />
  );
};
