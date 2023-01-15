import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class ScreenD extends Component{

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 Screen D입니다.</Text>

                <Button
                    title={'Screen E로 이동'}
                    onPress={()=>{
                    }}
                />

            </View>
        )
    }
}
