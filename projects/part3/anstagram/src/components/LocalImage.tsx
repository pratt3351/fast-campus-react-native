import React from 'react';
import {Image as RNImage, ImageProps, StyleProp} from 'react-native';

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

export const LocalImage:React.FC<{
    localAsset:number,
    width:number,
    height:number,
    style?:StyleProp<ImageProps>
}> =(props)=>{
    return (
        <RNImage 
            source={props.localAsset} 
            style={[props.style, {
                width:props.width, height:props.height
            }]}
        />
    )
}