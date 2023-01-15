import React, { useCallback, useContext, useState } from 'react';
import {View} from 'react-native';
import { CounterContext } from '../../App';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
const CounterTitle = ()=>{
    const [count] = useContext(CounterContext);

    return (
        <Typography fontSize={20}>
            {`${count}개`}
        </Typography>
    )
}

export const CounterScreen = ()=>{
    const [count, setCount] = useContext(CounterContext);

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
            </View>
        </View>
    )
}