import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { RemoteImage } from '../components/RemoteImage';
import { Typography } from '../components/Typography';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import { onClickFavorite } from '../actions/favorite';

export const ImageDetailScreen = (props)=>{
    const navigation = useNavigation();
    const route = useRoute();
    const [downloading, setDownloading] = React.useState(false);

    const dispatch = useDispatch();

    const onPressFavorite = useCallback(()=>{
        console.log('oNPressFavorite');
        dispatch(onClickFavorite(route.params.url))

    }, [] )

    const onPressBack = useCallback(()=>{
        navigation.goBack();
    }, [])

    const onPressDownload = useCallback(async()=>{
        setDownloading(true);

        const downloadResumable = FileSystem.createDownloadResumable(
            route.params.url,
            `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`,
            {},
            (downloadProgress)=>{
                console.log(downloadProgress);
            }
        )

        try{
            const {uri} = await downloadResumable.downloadAsync();
            console.log('Finished Downloading to ', uri)

            const permissionResult = await MediaLibrary.getPermissionsAsync(true);
            console.log('permissionResult',permissionResult);
            if(permissionResult.status === 'denied'){
                //아에 못쓰는 상태.
                setDownloading(false);

                return;
            }

            if(permissionResult.status === 'undetermined'){
                const requestResult = await MediaLibrary.requestPermissionsAsync();
                console.log(requestResult);
                if(requestResult.status === 'denied'){
                    setDownloading(false);

                    return;
                }
            }

            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.createAlbumAsync('MyFirstAlbum', asset, false) 
        }catch(ex){

        }

        setDownloading(false);

    }, [])

    const {width} = useWindowDimensions();

    const isFavorite = useSelector((state)=>{
        return state.favorite.favoriteList.filter((item)=> item === route.params.url).length > 0;
    })


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName={'arrow-back'} onPress={onPressBack}/>
                    <Header.Title title='IMAGE DETAIL'/>
                </Header.Group>

                <Header.Icon iconName={isFavorite ? 'heart' : 'heart-outline'} onPress={onPressFavorite}/>
            </Header>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <RemoteImage url={route.params.url} width={width} height={width * 1.5}/>
            </View>

            <Button onPress={onPressDownload}>
                <View style={{paddingBottom:24, backgroundColor:'black'}}>
                    {downloading ? (
                        <View style={{height:52, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <ActivityIndicator/>
                        </View>
                    ): (

                    <View  style={{height:52, flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                       <Typography color={'white'}>DOWNLOAD</Typography> 
                       <Icon name='download' size={24} color='white' />
                    </View>
                    )}
                </View>
            </Button>
    
        </View>
    )
}