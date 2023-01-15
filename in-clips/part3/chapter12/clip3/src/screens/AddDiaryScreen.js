import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';

export const AddDiaryScreen = ()=>{
    const navigation = useNavigation();
    const {width} = useWindowDimensions();
    const photoSize= useMemo(()=>{
        return {
            photoWidth:width,
            photoHeight:width*0.5,
        }
    }, [width])
    const [selectedPhotoUrl, setSelectedphotoUrl] = useState(null);
    const runImagePickAndUpload = useImagePickAndUpload(true);

    const onPressBack = useCallback(()=>{
        navigation.goBack();

    }, [])

    const onPressPhotoItem = useCallback(async ()=>{
        const result = await runImagePickAndUpload();
        if(result.length>0)
            setSelectedphotoUrl(result[0])
    },[])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD DIARY'/>
                </Header.Group>
                <Header.Icon iconName='close' onPress={onPressBack}/>
            </Header>


            <ScrollView style={{flex:1}}>
                <Button 
                    onPress={onPressPhotoItem}
                    >
                        
                    {selectedPhotoUrl !== null ? (
                        <RemoteImage url={selectedPhotoUrl} width={photoSize.photoWidth} height={photoSize.photoHeight}/>
                    ) : (
                        <View style={{flex:1, backgroundColor:'gray', width:photoSize.photoWidth, height:photoSize.photoHeight}}/>
                    )}
                </Button>

            </ScrollView>           
        </View>
    )
}