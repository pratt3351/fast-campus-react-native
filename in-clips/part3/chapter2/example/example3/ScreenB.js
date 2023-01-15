import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class ScreenB extends Component{

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 Screen B입니다.</Text>
                <Button
                    title={'뒤로가기'}
                    onPress={()=>{
                        this.props.navigation.pop();
                    }}
                />

                <Button
                    title={'ScreenC로 이동하기'}
                    onPress={()=>{
                        // this.props.navigation.pop();
                        this.props.navigation.navigate('Nested', {screen:'ScreenC'});

                    }}
                />
            </View>
        )
    }
}

