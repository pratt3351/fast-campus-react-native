import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { Button } from '../components/Button';
import {Header} from '../components/Header/Header';
import {SingleLineInput} from '../components/SingleLineInput'
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { atomLinkList } from '../states/atomLinkList';
export const AddLinkScreen = ()=>{
    const navigation = useNavigation();
    const [url, setUrl] = useState('');
    const safeAreaInsets = useSafeAreaInsets();
    const updateList = useSetRecoilState(atomLinkList);


    const onPressClose = useCallback ( ()=>{
        navigation.goBack();

    }, []);

    const onPressSave = useCallback(()=>{
        if(url === '') return;

        updateList((prevState)=>{
            const list = [{
                title:'',
                image:'',
                link:url,
                createdAt:new Date().toISOString(),
            },
            ...prevState.list];

            return {
                list
            }
        })
        setUrl('');

    }, [url])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='ADD LINK' />
                </Header.Group>

                <Header.Icon iconName='close' onPress={onPressClose} />
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:24}}>
                <SingleLineInput
                    value ={url}
                    onChangeText={setUrl}
                    placeholder='https:///www.example.com'
                />
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