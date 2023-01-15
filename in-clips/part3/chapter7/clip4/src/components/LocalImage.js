import React from 'react';
import {Image} from 'react-native';
import propTypes, { number } from 'prop-types';

export const LocalImage = (props)=>{
    return (
        <Image
            source={props.localAsset} 
            style={[props.style, {width:props.width, height:props.height}]} 
        />
    )
}

// export class LocalImage extends React.Component {
//     render(){
//         return (
//             <Image
//                 source={this.props.localAsset} 
//                 style={[this.props.style, {width:this.props.width, height:this.props.height}]} 
//             />
//         )
//     }
// }

LocalImage.propTypes = {
    localAsset: propTypes.number.isRequired,
    width: propTypes.number.isRequired,
    height: propTypes.number.isRequired,
}