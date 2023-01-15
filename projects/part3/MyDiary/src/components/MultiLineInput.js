import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export const MultiLineInput = (props)=>{
    const [focused, setFocused] = useState(false);

    return (
        <View style={{
            alignSelf:'stretch',
            paddingHorizontal:12,
            paddingVertical:8,
            borderRadius:4,
            borderWidth:1,
            borderColor:focused ? 'black':'gray',
        }}>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                multiline
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                style={[props.style, { 
                    fontSize:props.fontSize ?? 20, 
                    height:props.height?? 200
                }]}
                onFocus={()=>{
                    setFocused(true);
                }}
                onBlur={()=>{
                    setFocused(false);
                }}
                onSubmitEditing={props.onSubmitEditing}
            />
        </View>
    )
}