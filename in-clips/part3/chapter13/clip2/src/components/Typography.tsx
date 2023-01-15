import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

// export class Typography extends React.Component{
//     render(){
//         return (
//             <RNText 
//                 style={{
//                     color:this.props.color, 
//                     fontSize:this.props.fontSize
//                 }}>
//                 {this.props.children}
//             </RNText>
//         )
//     }
// } 

export const Typography:React.FC<{
    color?:string, 
    fontSize?:number, 
    numberOfLines?:number, 
    children:React.ReactNode | string
}> = (props)=>{
    return (
        <RNText 
            style={{
                color: props.color ?? 'black', 
                fontSize: props.fontSize ?? 10
            }}
            numberOfLines={props.numberOfLines}>
            {props.children}
        </RNText>
    )
}
