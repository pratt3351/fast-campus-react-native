import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class TabB extends Component{

    componentDidMount() {
        this._unscribe = this.props.navigation.addListener('focus', ()=>{
            console.log('focus TabB!')
        })
    }

    componentWillUnmount() {
        this._unscribe();
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 TabB입니다.</Text>
                <Button
                    title={'Tab A로 이동'}
                    onPress={()=>{
                        this.props.navigation.jumpTo('TabA')
                    }}
                />
            </View>
        )
    }
}
