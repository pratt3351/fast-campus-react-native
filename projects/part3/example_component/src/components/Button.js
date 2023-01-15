import React from 'react';
import { Pressable } from 'react-native';
// export class Button extends React.Component{

//     render(){
//         return (
//             <Pressable 
//                 onPress={this.props.onPress}
//                 hitSlop={this.props.hitSlop ?? {left:0, right:0, top:0, bottom:0}}
//                 >
//                 {this.props.children}
//             </Pressable>
//         )
//     }
// }

export const Button = (props)=>{
    return (
        <Pressable 
            onPress={props.onPress} 
            hitSlop={props.hitSlop ?? {left:0, right:0, top:0, bottom:0}}>

            {props.children}
        </Pressable>
    )
}