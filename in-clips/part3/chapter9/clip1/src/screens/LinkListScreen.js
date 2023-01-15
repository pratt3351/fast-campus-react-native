import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import {Header} from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';

export const LinkListScreen = ()=>{
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();


    const onPressListItem = useCallback(()=>{
        navigation.navigate('LinkDetail');
    }, [])
    
    const onPressAdd = useCallback(()=>{
        navigation.navigate('AddLink');
    }, [])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='LINK LIST' />
                </Header.Group>
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Button onPress={onPressListItem}>
                    <Typography>상세화면으로 이동하기</Typography>
                </Button>
            </View>

            <View style={{position:'absolute', right:24, bottom:safeAreaInsets.bottom + 24, }}>
                <Button 
                    onPress={onPressAdd}>
                        <View style={{width:52, height:52, borderRadius:26, alignItems:'center', justifyContent:'center', backgroundColor:'black'}}>
                            <Icon name='add' color='white' size={32} /> 
                        </View>
                </Button>
            </View>
        </View>
    )
}