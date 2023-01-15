import React from 'react';
import {View} from 'react-native';
import { Typograph } from './Typography';
import propTypes from 'prop-types';


export class Badge extends React.Component {

    render(){
        return (
            <View>
                <View>
                    {this.props.children}
                    <View style={[
                        {
                            width:16, 
                            height:16, 
                            borderRadius:8,
                            backgroundColor:'red',
                            alignItems:'center',
                            justifyContent:'center',
                        }, 
                        {
                            position:'absolute', 
                            right: -5, 
                            top: -5,
                        }]}>
                        <Typograph fontSize={10} color='white'>N</Typograph>
                    </View>
                </View>
            </View>
        )
    }
}

Badge.propTypes = {
    children:propTypes.element.isRequired
}