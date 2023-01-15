import React from 'react';
import { View, TextInput } from 'react-native';

export const PasswordInputBox = (props)=>{

    return (
        <View style={{flexDirection:'row', alignItems:'center',paddingHorizontal:24}}>
            <TextInput
                autoFocus
                value={props.value}
                onChangeText={props.onChangeText}
                caretHidden
                keyboardType='number-pad'
                maxLength={4}
                style={{width:200, height:100, opacity:0, position:'absolute'}}
            />

            {[0,1,2,3].map((item)=>{
                return (
                    <View style={{flex:1, height:100, marginRight:item !== 3 ? 12:0, alignItems:'center', justifyContent:'center', borderBottomWidth:1, borderColor:'black'}}>
                        {props.value.length > item && (
                            <View style={{width:20, height:20, borderRadius:10, backgroundColor:'black'}}/>
                        )}
                    </View>
                )
            })}
        </View>
    )
}