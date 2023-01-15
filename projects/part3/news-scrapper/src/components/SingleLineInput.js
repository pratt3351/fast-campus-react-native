import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export const SingleLineInput = (props)=>{
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
                autoCorrect={false}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                style={[props.style, { fontSize:props.fontSize ?? 20}]}
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