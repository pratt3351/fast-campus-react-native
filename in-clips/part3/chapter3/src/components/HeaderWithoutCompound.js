import React from 'react';
import {View, Dimensions, Pressable} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Button } from './Button';
import { Icon } from './Icon';
import { Spacer } from './Spacer';
import { Typograph } from './Typography';
const {width} = Dimensions.get('window');

export class HeaderWitoutCompound extends React.Component { 

    render(){

        return (
            <SafeAreaInsetsContext.Consumer>
                {insets => (
                    <View style={{paddingTop:insets.top, backgroundColor:'white'}}>
                        <View style={{
                            width:width,
                            flexDirection:'row', 
                            height:56, 
                            borderBottomColor:'gray', 
                            borderBottomWidth:1,
                            alignItems:'center',
                        }}>
                            <Spacer horizontal={true} space={12} />
                            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between' }}>

                                <View style={{flexDirection:'row', alignItems:'center', height:32,}}>
                                    {this.props.leftIcon && (
                                        <View style={{flexDirection:'row',}}>
                                            <Button onPress={this.props.leftIcon.onPress}>
                                                <Icon iconName={this.props.leftIcon.iconName} iconSize={28} />
                                            </Button>
                                            <Spacer horizontal space={8}/>
                                        </View>
                                    )}
                                    <Typograph fontSize={18}>{this.props.title}</Typograph>
                                </View>
                                <View style={{width:32, height:32,}}>
                                    {this.props.rightIcon && (
                                        <Button onPress={this.props.rightIcon.onPress}>
                                            <Icon iconName={this.props.rightIcon.iconName} iconSize={28} />
                                        </Button>
                                    )}
                                </View>
                            </View>
                            <Spacer horizontal={true} space={12} />
                        </View>

                    </View>
                )}

            </SafeAreaInsetsContext.Consumer>

        )
    }
}