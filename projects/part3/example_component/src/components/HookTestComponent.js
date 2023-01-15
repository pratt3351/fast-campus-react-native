import React, { useMemo } from 'react';
import {View} from 'react-native';
import { Typography } from './Typography';

export const HookTestCompoent = (props)=>{
    const text = useMemo(()=>{
        return props.a + props.b;
    }, [props.a, props.b])

    return (
        <View>
            <Typography>
                결과값 : {text}
            </Typography>
        </View>
    )
}