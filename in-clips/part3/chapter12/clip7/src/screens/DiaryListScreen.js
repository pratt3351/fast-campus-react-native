import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { stateDiaryList } from '../states/stateDiaryList';

export const DiaryListScreen = ()=>{
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    const safeAreaInset = useSafeAreaInsets();
    const data = useRecoilValue(stateDiaryList);



    const onPressSetting = useCallback(()=>{
        navigation.navigate('Setting');

    }, [])

    const onPressAdd = useCallback(()=>{
        navigation.navigate('AddDiary')
    }, [])

    // const [data, setData] = useState([{
    //     id:0,
    //     title:'TITLE_01',
    //     content:'CONTENT_01',
    //     createAt:'2022-12-01',
    //     updateAt:'2022-12-02',
    //     imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png'
    // }, {
    //     id:1,
    //     title:'TITLE_02',
    //     content:'CONTENT_02',
    //     createAt:'2022-12-01',
    //     updateAt:'2022-12-02',
    //     imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png'
    // }, {
    //     id:2,
    //     title:'TITLE_03',
    //     content:'CONTENT_03',
    //     createAt:'2022-12-01',
    //     updateAt:'2022-12-02',
    //     imageUrl:null
    // }])
    console.log(data);

    return (
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <Header>
                    <Header.Group>
                        <Header.Title title='DIARY LIST'/>
                    </Header.Group>
                    <Header.Icon iconName='settings' onPress={onPressSetting}/> 
                </Header>

                <FlatList
                    data={data}
                    contentContainerStyle={{paddingHorizontal:24, paddingVertical:32}}
                    renderItem={({item})=>(
                        <Button onPress={()=>{
                            navigation.navigate('DiaryDetail', {item})
                        }}>
                            <View style={{paddingVertical:12}}>
                                    {typeof item.photoUrl !== 'undefined' && (
                                        <>
                                            <RemoteImage 
                                                url={item.photoUrl} 
                                                width={width-24*2} 
                                                height={(width-24*2)*0.5}
                                                style={{borderRadius:8}}
                                                />
                                            <Spacer space={4}/>
                                        </>
                                    )}
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <View>
                                        <Typography fontSize={18}>{item.title}</Typography>
                                        <Spacer space={4}/>
                                        <Typography fontSize={12}>{item.content}</Typography>
                                    </View>
                                    <Typography>{item.updatedAt}</Typography>
                                </View>
                            </View>
                        </Button>
                    )}
                />
            </View>

            <View style={{position:'absolute', right:12, bottom:safeAreaInset.bottom + 24}}>
                <Button onPress={onPressAdd}>
                    <View style={{
                        width:60, 
                        height:60, 
                        borderRadius:30, 
                        backgroundColor:'black', 
                        alignItems:'center', 
                        justifyContent:'center'
                    }}>
                        <Icon name='add' color='white' size={30}/>
                    </View>
                </Button>                         
            </View>
            

        </View>
    )
}