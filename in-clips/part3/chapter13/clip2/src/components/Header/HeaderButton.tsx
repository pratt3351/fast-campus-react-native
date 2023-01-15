import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {Button} from '../Button'
import {Icon} from '../Icons'

export const HeaderIcon:React.FC<{
    onPress:()=>void;
    iconName:keyof typeof Ionicons['glyphMap']
}> = (props)=>{
    return (
        <Button onPress={props.onPress}>
            <Icon name={props.iconName} size={28} color='black'/>
        </Button>
    )
}