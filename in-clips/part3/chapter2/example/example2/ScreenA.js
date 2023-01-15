import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class ScreenA extends Component{

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 Screen A입니다.</Text>
                <Button
                    title={'B Screen으로 이동하기'}
                    onPress={()=>{
                        this.props.navigation.navigate('ScreenB', {value:'from B'})
                    }}
                />
            </View>
        )
    }
}
