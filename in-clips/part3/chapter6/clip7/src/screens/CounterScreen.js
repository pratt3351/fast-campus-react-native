import React, { useCallback, useContext, useState } from 'react';
import {View} from 'react-native';
import { useSelector } from 'react-redux';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { counterMultiplier } from '../selectors/counterMultiplier';
import { counterState } from '../states/counter';

const CounterTitle = ()=>{
    const count = useRecoilValue(counterState);
    return (
        <Typography fontSize={20}>
            {`${count}개`}
        </Typography>   
    )
}

const CountMultiflier = ()=>{
    const result = useRecoilValue(counterMultiplier);

    return (
        <Typography fontSize={20}>
            {`${result}개`}
        </Typography>   
    )
}

export const CounterScreen = ()=>{
    const [count, setCount] = useRecoilState(counterState);

    const onPressPlus = useCallback(()=>{
        setCount((value)=> value+1)
    }, [])

    const onPressMinus = useCallback(()=>{
        setCount((value)=> value-1)
    }, [])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title='COUNTER' />
            </Header>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressMinus}>
                        <Icon name='remove' size={20}/>
                    </Button>


                    <Spacer horizontal space={20}/>
                    <CounterTitle/>
                    <Spacer horizontal space={20}/>


                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon name='add' size={20}/>
                    </Button>
                </View>

                <CountMultiflier/>
            </View>
        </View>
    )
}