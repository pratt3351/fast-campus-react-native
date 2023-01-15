import React from 'react';
import { TextInput, View } from 'react-native';
import { Spacer } from './Spacer';
import { Typography } from './Typography';


export const PasswordInputBox = (props)=>{
    
    return (
        <>
                <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24}}>

            <TextInput
                autoFocus
                value={props.value}
                onChangeText={props.onChangeText}
                caretHidden
                keyboardType='number-pad'
                maxLength={4}
                style={{width:20, height:20, opacity:0, position:'absolute'}}
            />

            {[0,1,2,3].map((item)=>{

                return (
                    <View style={{
                        flex:1, 
                        height:100,
                        marginRight:item !== 3 ? 12: 0,
                        alignItems:'center',
                        justifyContent:'center',
                        borderBottomWidth:2,
                        borderColor: props.errorMessage ? 'red':'black'
                    }}>
                        {props.value.length > item && (
                            <View style={{
                                width:20, 
                                height:20, 
                                borderRadius:10, 
                                backgroundColor:props.errorMessage ? 'red':'black'
                            }}/>
                        )}
                    </View>
                )
            })}

            </View>
            {props.errorMessage && (
                <>
                    <Spacer space={12}/>
                    <View style={{ flexDirection:'row', paddingHorizontal:24}}>
                        <Typography fontSize={16} color='red'>{props.errorMessage}</Typography>
                    </View>
                </>
            )}
        </>

    )
}