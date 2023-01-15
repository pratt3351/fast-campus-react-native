import React, { useCallback, useState } from 'react';
import {View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteCount } from '../actions/counter';
import { Button } from '../components/Button';
import {Header} from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';

export const CounterScreen = ()=>{
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const count = useSelector((state)=> state.count.count)

    const onPressPlus = useCallback(()=>{
        // setValue((value)=> value+1)
        dispatch(addCount());
    }, [])

    const onPressMinus = useCallback(()=>{
        // setValue((value)=> value-1)
        dispatch(deleteCount());
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

                    <Typography fontSize={20}>
                        {`${count}개`}
                    </Typography>

                    <Spacer horizontal space={20}/>


                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon name='add' size={20}/>
                    </Button>
                </View>
            </View>
        </View>
    )
}