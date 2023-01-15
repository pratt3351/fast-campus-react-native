import React, {Component} from 'react';
import {Button, Text, View} from "react-native";

export class TabA extends Component{
    componentDidMount() {
        this._unscribe = this.props.navigation.addListener('tabPress', ()=>{
            console.log('tabPress Tab A!')
        })
    }

    componentWillUnmount() {
        this._unscribe();
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>이것은 TabA입니다.</Text>
                <Button
                    title={'Tab B로 이동'}
                    onPress={()=>{
                        this.props.navigation.jumpTo('TabB')
                    }}/>
            </View>
        )
    }
}
