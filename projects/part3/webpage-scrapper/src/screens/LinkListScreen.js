import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, SectionList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { atomLinkList } from '../states/atomLinkList';

export const LinkListScreen = ()=>{
    const navigation = useNavigation();
    const safeAreaInset = useSafeAreaInsets();
    const data = useRecoilValue(atomLinkList);


    const onPressListItem = useCallback((item)=>{
        navigation.navigate('LinkDetail', {item})
    }, [])

    const onPressAddButton = useCallback(()=>{
        navigation.navigate('AddLink')
    }, [])

    const sectionData = useMemo(()=>{
        const dateList = {};

        // {
        //     "2022-11-12":[{
        //         item:...
        //     }]
        // }

        const makeDateString = (createdAt)=>{
            const dateItem = new Date(createdAt);
            return `${dateItem.getFullYear()}.${dateItem.getMonth()}.${dateItem.getDay()} ${dateItem.getHours()}:${dateItem.getMinutes()}`
        }


        if(!data.list) return [];


        data.list.forEach((item)=>{
            const keyName = makeDateString(item.createdAt);
            if(!dateList[keyName]){
                dateList[keyName] = [item];
            } else { 
                dateList[keyName].push(item);
            }
        })

        return Object.keys(dateList).map((item)=>{
            return {
                title:item,
                data:dateList[item]
            }
        })
    }, [data.list])

    console.log(data);
    
    return (
        <View style={{flex:1,}}>
            <Header>
                <Header.Group>
                    <Header.Title title='LINK LIST'/>
                </Header.Group>
            </Header>

            <SectionList
                style={{flex:1}}
                sections={sectionData}
                renderItem={({item})=>{
                    return (
                        <Button onPress={()=>onPressListItem(item)} paddingHorizontal={24} paddingVertical={24}>
                            <View>
                                <Typography fontSize={20}>
                                    {item.link}
                                </Typography>

                                <Spacer space={4}/>

                                <Typography fontSize={16} color='gray'>
                                    {item.title !== '' ? `${item.title.slice(0, 20)} | `  : ''}{new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </View>
                        </Button>
                    )
                }}

                renderSectionHeader={({section})=>{

                    console.log(section);

                    return (
                        <View style={{paddingHorizontal:12, paddingVertical:4, backgroundColor:'white'}}>
                            <Typography color='gray' fontSize={12}>{section.title}</Typography>
                        </View>
                    )
                }}
            />


            <View style={{position:'absolute', right:24, bottom:24 + safeAreaInset.bottom}}>
                <Button onPress={onPressAddButton}>
                    <View style={{width:52, height:52, borderRadius:26, alignItems:'center', justifyContent:'center', backgroundColor:"black"}}>
                        <Icon name='add' color='white' size={32}/>
                    </View>
                </Button>
            </View>
        </View>
    )
}