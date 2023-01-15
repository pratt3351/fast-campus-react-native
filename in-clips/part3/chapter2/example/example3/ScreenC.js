import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class ScreenC extends Component{

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 Screen C입니다.</Text>
                <Button
                    title={'뒤로가기'}
                    onPress={()=>{
                        this.props.navigation.pop();
                    }}
                />


                <Button
                    title={'Screen A로 navigate'}
                    onPress={()=>{
                        this.props.navigation.navigate('ScreenA');
                    }}
                />

                <Button
                    title={'Screen B를 push'}
                    onPress={()=>{
                        this.props.navigation.push('ScreenB');
                    }}
                />


<Button
                    title={'Screen C를 push'}
                    onPress={()=>{
                        this.props.navigation.push('ScreenC');
                    }}
                />
            </View>
        )
    }
}
