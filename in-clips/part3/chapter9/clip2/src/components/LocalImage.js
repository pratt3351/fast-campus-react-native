import React from 'react';
import {Image as RNImage} from 'react-native';

// export class LocalImage extends React.Component {
//     render(){

//         return (
//             <RNImage 
//                 source={this.props.localAsset} 
//                 style={[this.props.style, {
//                     width:this.props.width, height:this.props.height
//                 }]}/>
//         )
//     }
// }

export const LocalImage =(props)=>{
    return (
        <RNImage 
            source={props.localAsset} 
            style={[props.style, {
                width:props.width, height:props.height
            }]}
        />
    )
}