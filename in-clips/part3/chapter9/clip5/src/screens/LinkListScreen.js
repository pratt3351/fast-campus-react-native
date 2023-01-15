import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Pressable, SectionList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { Button } from '../components/Button';
import {Header} from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { atomLinkList } from '../states/atomLinkList';

export const LinkListScreen = ()=>{
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const data = useRecoilValue(atomLinkList);

    const onPressListItem = useCallback((item)=>{
        navigation.navigate('LinkDetail', {item});
    }, [])

    const onPressAdd = useCallback(()=>{
        navigation.navigate('AddLink');
    }, [])

    const sectionData = useMemo(()=>{
        const dateList = {};

        const makeDateString = (createdAt)=>{
            const dateItem = new Date(createdAt);

            return `${dateItem.getFullYear()}.${dateItem.getMonth()}.${dateItem.getDay()} ${dateItem.getHours()}:${dateItem.getMinutes()}`
        }
        if(!data.list) return [];

        console.log(data.list);


        data.list.forEach((item)=>{
            const keyName = makeDateString(item.createdAt);

            if(!dateList[keyName]){
                dateList[keyName] = [item] ;
            }else {
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

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='LINK LIST' />
                </Header.Group>
            </Header>

            <SectionList
                style={{flex:1}}
                sections={sectionData}
                keyExtractor={(item, index)=> `${item}.${index}`}
                renderItem={({item})=>(
                    <Button
                        onPress={()=> onPressListItem(item)}
                        paddingHorizontal={24}
                        paddingVertical={24}
                        backgroundColor='white'>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1, }}>
                                <Typography fontSize={20}>
                                    {item.link}
                                </Typography>
                                <Spacer space={4}/>
                                <Typography fontSize={16} color='gray'>
                                    {`${item.title !== '' ?  item.title.slice(0, 20) + ' | ' :''}`}{new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </View>
                            {item.image !== ''&& (
                                <RemoteImage width={50} height={50} url={item.image}/>
                            )}
                        </View>
                    </Button>
                )}

                renderSectionHeader={({section})=>{
                    console.log(section);

                    return (
                        <View style={{paddingHorizontal:12, paddingVertical:4, backgroundColor:'white'}}>
                            <Typography color={'gray'} fontSize={12}>{section.title}</Typography>
                        </View>
                    )
                }}
            />
            {/* <FlatList
                style={{flex:1, }}
                data={data.list}
                renderItem={({item})=>(
                    <Button onPress={()=> onPressListItem(item)} paddingHorizontal={24} paddingVertical={24}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1, }}>
                                <Typography fontSize={20}>
                                    {item.link}
                                </Typography>
                                <Spacer space={4}/>
                                <Typography fontSize={16} color='gray'>
                                    {`${item.title !== '' ?  item.title.slice(0, 20) + ' | ' :''}`}{new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </View>
                            {item.image !== ''&& (
                                <RemoteImage width={50} height={50} url={item.image}/>
                            )}
                        </View>
                    </Button>
                )}
            /> */}
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
