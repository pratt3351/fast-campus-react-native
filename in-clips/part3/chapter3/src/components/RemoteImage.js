import React from 'react';
import {Image} from 'react-native';
import propTypes, { number, string } from 'prop-types';


export class RemoteImage extends React.Component {
    render(){
        return (
            <Image
                source={{uri:this.props.url}} 
                style={[this.props.style, {width:this.props.width, height:this.props.height}]} 
            />
        )
    }
}

RemoteImage.propTypes = {
    url: propTypes.string.isRequired,
    width: propTypes.number,
    height: propTypes.number,
    style: propTypes.object
}