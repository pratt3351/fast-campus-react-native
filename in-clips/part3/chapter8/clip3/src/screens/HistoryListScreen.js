import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Typography } from '../components/Typography';
import {Header} from '../components/Header/Header';
import {Divider} from '../components/Divider';
import {LottoNumberView} from '../components/LottoNumberView'
import { useSelector } from 'react-redux';
export const HistoryListScreen = (props)=>{
    // const [history, setHistory] = useState([
    //     {date:new Date(), numbers:[1,2,3,4,5,6]},
    //     {date:new Date(), numbers:[1,2,3,4,5,6]},
    //     {date:new Date(), numbers:[1,2,3,4,5,6]},
    //     {date:new Date(), numbers:[1,2,3,4,5,6]},
    // ])

    const history = useSelector((state)=> state.numbers.history);
    
    return (
        <View style={{flex:1,}}>
            <Header>
                <Header.Group>
                    <Header.Title title='HISTORY LIST'></Header.Title>
                </Header.Group>
            </Header>
            <FlatList
                style={{flex:1}}
                data={history}
                ItemSeparatorComponent ={()=><Divider/>}
                contentContainerStyle={{
                    paddingTop:24,
                    paddingBottom:24
                }}
                renderItem={({item})=>(
                    <View style={{ paddingHorizontal:20, paddingVertical:12,marginHorizontal:24, height:120, backgroundColor:'white'}}>
                        <Typography fontSize={16}>{item.date}</Typography>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <LottoNumberView numbers={item.numbers}/>
                        </View>
                    </View>
                )} 
            />
        </View>
    )
}