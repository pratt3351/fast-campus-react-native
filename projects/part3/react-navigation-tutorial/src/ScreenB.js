import React from 'react';
import {View, Text, Button} from 'react-native';

export class ScreenB extends React.Component{

    render(){
        return (
            <View style={{flex:1, alignContent:'center', justifyContent:'center'}}>
                <Text>이것은 B Screen 입니다. 받은 값 : {this.props.route.params.value}</Text>
                <Button 
                    title='뒤로가기' 
                    onPress={()=>{
                        console.log('뒤로가기가 클릭됨')
                    }}/>
            </View>
        )
    }
}