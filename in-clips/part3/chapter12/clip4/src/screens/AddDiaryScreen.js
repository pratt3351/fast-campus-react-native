import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';

export const AddDiaryScreen = ()=>{
    const navigation = useNavigation();
    const {width} = useWindowDimensions();
    const [visibleDatePicker,setVisibleDatePicker] = useState(false);

    const photoSize= useMemo(()=>{
        return {
            photoWidth:width,
            photoHeight:width*0.5,
        }
    }, [width])
    const [selectedDay, setSelectedDay] = useState(null);
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

    const onPressCalendar = useCallback(()=>{
        setVisibleDatePicker(true);

    }, [])
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
                        <View 
                            style={{
                                backgroundColor:'lightgray', 
                                width:photoSize.photoWidth, 
                                height:photoSize.photoHeight,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <Icon name='add' color='gray' size={32} />
                        </View>
                    )}
                </Button>

                <Spacer space={20}/>

                <Button onPress={onPressCalendar}>
                    <View style={{
                        flexDirection:'row',
                        paddingHorizontal:24, 
                        paddingVertical:12, 
                        alignItems:'center', 
                        justifyContent:'space-between'
                    }}>
                        <Typography fontSize={20}>날짜</Typography>

                        <Typography fontSize={16}>
                            {selectedDay === null ? '날짜를 선택해 주세요':`${selectedDay.getFullYear()}-${selectedDay.getMonth()+1}-${selectedDay.getDate()}`}
                        </Typography>
                    </View>
                </Button>

            </ScrollView>           

            <DateTimePicker
                isVisible={visibleDatePicker}
                mode='date'
                onConfirm={(date)=>{
                    console.log(date);

                    setSelectedDay(new Date(date))
                    setVisibleDatePicker(false);
                }}
                onCancel={()=>{
                    setVisibleDatePicker(false);
                }}
            />
        </View>
    )
}