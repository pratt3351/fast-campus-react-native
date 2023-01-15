import React, { useCallback } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { Typography } from '../components/Typography';
import { Header } from '../components/Header/Header';
import { IMAGE_LIST } from '../constants/imageList';
import { PhotoListItem } from '../components/PhotoListItem';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Spacer } from '../components/Spacer';
import { RemoteImage } from '../components/RemoteImage';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const ImageDetailScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();


    const onPressBack = useCallback ( ()=>{
        navigation.goBack();

    }, [navigation])

    const {width} = useWindowDimensions();
    const onPressDownload = useCallback(async()=>{
        const downloadResumable = FileSystem.createDownloadResumable(
            route.params.url,
            `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
        )
        try{
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);

            const permissionResult = await MediaLibrary.getPermissionsAsync(true);
            console.log('permissionResult', permissionResult);
            if(permissionResult.status === 'undetermined'){
                await MediaLibrary.requestPermissionsAsync();
            }

            if(permissionResult.status === 'denied'){
                //denied.
                return;
            }

            const asset = await MediaLibrary.createAssetAsync(uri);

            MediaLibrary.createAlbumAsync("TestFolder", asset, false)
            .then(() => console.log('File Saved Successfully'))
            .catch(() => console.log('Error in saving file'));


        }catch(ex){
            console.log(ex);
            
        }

    }, [])

    return (
        <View style={{flex:1, borderColor:'red'}}>

            <Header>
                <Header.Group>

                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='DETAIL'></Header.Title>

                </Header.Group>
            </Header>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <RemoteImage url={route.params.url} width={width} height={width * 1.5} />
            </View>

            <Button onPress={onPressDownload}>
                <View style={{paddingBottom:24, backgroundColor:'black'}}>
                    <View style={{height:52, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Typography color={'white'}>DOWNLOAD</Typography>
                        <Icon iconName={'download'} iconSize={24} iconColor='white'/>
                    </View>
                </View>
            </Button>

        </View>
    )
}