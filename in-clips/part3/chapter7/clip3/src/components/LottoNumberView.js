import React, {useCallback} from 'react';
import {View} from 'react-native';
import { Typography } from './Typography';
export const LottoNumberView = (props)=>{

    const getNumberBackgroundColor = useCallback(()=>{
        const randomNumber = Math.floor( Math.random() *10) %6;

        if(randomNumber === 0) return 'red';

        if(randomNumber === 1) return 'black';

        if(randomNumber === 2) return 'blue';

        if(randomNumber === 3) return 'gray';

        if(randomNumber === 4) return 'green';

        if(randomNumber === 5) return 'purple'
        return 'black'
    }, [])


    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            {props.numbers.map((item)=>(
                <View style={{backgroundColor:getNumberBackgroundColor(), width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
                    <Typography fontSize={20} color='white'>{item}</Typography>
                </View>
            ))}
        </View>
    )
}