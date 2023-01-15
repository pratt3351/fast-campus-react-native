import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { Button } from '../components/Button';
import {Header} from '../components/Header/Header';
import {SingleLineInput} from '../components/SingleLineInput'
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { atomLinkList } from '../states/atomLinkList';
import { getOpenGraphData } from '../utils/OpenGraphTagUtils';
import {RemoteImage} from '../components/RemoteImage'
import {getStringAsync} from 'expo-clipboard'
export const AddLinkScreen = ()=>{
    const navigation = useNavigation();
    const [url, setUrl] = useState('');
    const [metaData, setMetaData] = useState(null);
    const {width} = useWindowDimensions();

    const safeAreaInsets = useSafeAreaInsets();

    const updateList = useSetRecoilState(atomLinkList);

    const onPressClose = useCallback ( ()=>{
        navigation.goBack();

    }, []);

    const onPressSave = useCallback(()=>{
        if(url === '') return;

        updateList((prevState)=>{
            const list = [{
                title:metaData.title,
                image:metaData.image,
                description:metaData.description,
                link:url,
                createdAt:new Date().toISOString(),
            },
            ...prevState.list];

            return {
                list
            }
        })
        setUrl('');
        setMetaData(null);


    }, [url, metaData])

    const getClipboardString = useCallback(async()=>{
        const result = await getStringAsync();
        console.log('getStringAsync ' +result);
        if(result.startsWith('http://') || result.startsWith('https://')){
            setUrl(result);

            const ogResult = await getOpenGraphData(result)
            setMetaData({
                title:ogResult.title,
                image:ogResult.image,
                description:ogResult.description,
            })
        }
    }, [])
    useEffect(()=>{
        getClipboardString();

    }, [])


    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD LINK' />
                </Header.Group>

                <Header.Icon iconName='close' onPress={onPressClose} />
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'flex-start', paddingTop:32, paddingHorizontal:24}}>
                <SingleLineInput
                    value ={url}
                    onChangeText={setUrl}
                    placeholder='https:///www.example.com'
                    onSubmitEditing={async()=>{
                        if(url === '') return;
                        const result = await getOpenGraphData(url)
                        setMetaData({
                            title:result.title,
                            image:result.image,
                            description:result.description,
                        })
                    }}
                />

                {metaData !== null && (
                    <>
                        <Spacer space={20}/>
                        <View style={{borderWidth:1, borderRadius:4, borderColor:'gray'}}>
                            <RemoteImage url={metaData.image} width={width-48} height={((width-48 )* 0.5)}/>
                            <View style={{paddingHorizontal:12, paddingVertical:8}}>
                                <Spacer space={10}/>
                                <Typography fontSize={20} color={'black'}>{metaData.title}</Typography>
                                <Spacer space={4}/>
                                <Typography fontSize={16} color={'gray'}>{metaData.description}</Typography>
                            </View>
                        </View>
                    </>
                )}
            </View>

            <Button onPress={onPressSave}>
                <View style={{backgroundColor: url === '' ? 'gray' :'black', }}>
                    <View style={{height:52, alignItems:'center', justifyContent:'center'}}>
                        <Typography color={'white'} fontSize={18}>저장하기</Typography>
                    </View>
                    <Spacer space={safeAreaInsets.bottom}/>
                </View>                
            </Button>
        </View>
    )
}