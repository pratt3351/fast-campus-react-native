import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { MultiLineInput } from '../components/MultiLineInput';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { createFeed, TypeFeedListDispatch } from '../actions/feed';

export const AddFeedScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const dispatch = useDispatch<TypeFeedListDispatch>();

    const [selectedPhoto, setSelectedPhoto] = useState<string|null>(null);
    const [inputMessage, setInputMessage] = useState('');

    const canSave = useMemo(()=>{
        if(selectedPhoto === null) return false;

        if(inputMessage ==='') return false;

        return true;
        
    }, [selectedPhoto, inputMessage])

    const onPressBack = useCallback(()=>{
        rootNavigation.goBack();
    }, [])

    const onPressGetPhoto = useCallback(async()=>{
        console.log('onPressGetPhoto')
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:false,
            quality:1,
        })

        if(result.canceled){
            return;
        }

        setSelectedPhoto(result.assets[0].uri);
    },[])

    const onPressSave = useCallback(async()=>{
        if(!canSave) return;

        if(selectedPhoto === null) return;

        await dispatch(
            createFeed({
                imageUrl:selectedPhoto,
                content:inputMessage,
            })
        )

        rootNavigation.goBack();
        
    }, [canSave, selectedPhoto, inputMessage])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='ADD FEED'></Header.Title>
                <Header.Icon iconName='close' onPress={onPressBack}></Header.Icon>
            </Header>

            <View style={{flex:1, flexDirection:'column', paddingHorizontal:20, paddingTop:32}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Button onPress={onPressGetPhoto}>
                        {selectedPhoto !== null ? (
                            <RemoteImage 
                                url={selectedPhoto}
                                width={100} 
                                height={100} 
                                style={{borderRadius:4}}/>
                        ) : (
                            <View style={{
                                width:100, 
                                height:100,
                                backgroundColor:'lightgray',
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:4,
                            }}>
                                <Icon name='add' color='gray' size={32}/>
                            </View>
                        )}
                    </Button>

                    <View style={{flex:1, marginLeft:8}}>
                        <MultiLineInput
                             value={inputMessage}
                             onChangeText={setInputMessage}
                             onSubmitEditing={onPressSave}
                             placeholder='입력해주세요'
                             height={80}
                             fontSize={16}
                        />
                    </View>
                </View>
            </View>

            <Button onPress={onPressSave}>
                <View style={{backgroundColor:canSave ? 'black':'lightgray'}}>
                    <View style={{
                            height:52, 
                            alignItems:'center', 
                            justifyContent:'center'
                        }}>
                        <Typography fontSize={18} color={canSave ? 'white' : 'gray'}>저장하기</Typography>
                    </View>
                    <Spacer space={safeAreaInsets.bottom}/>
                </View>
            </Button>
        </View>
    )
}