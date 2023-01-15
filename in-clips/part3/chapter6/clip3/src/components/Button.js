import React from 'react';
import {Pressable, View} from 'react-native';
import propTypes from 'prop-types';

export const Button = (props)=>{
    return (
        <Pressable 
            onPress={props.onPress} 
            hitSlop={props.hitSlop ?? {left:0, right:0,top:0, bottom:0}}
            style={{
                paddingHorizontal:props.paddingHorizontal, 
                paddingVertical:props.paddingVertical
            }}
        >
            {props.children}
        </Pressable>
    )
}

// export class Button extends React.Component { 
//     render(){
//         return (
//             <Pressable 
//                 onPress={this.props.onPress} 
//                 hitSlop={this.props.hitSlop ?? {left:0, right:0,top:0, bottom:0}}
//                 style={{
//                     paddingHorizontal:this.props.paddingHorizontal, 
//                     paddingVertical:this.props.paddingVertical
//                 }}
//             >
//                 {this.props.children}
//             </Pressable>
//         )
//     }
// }

Button.propTypes = {
    onPress: propTypes.func.isRequired,
    children:propTypes.element.isRequired,
    hitSlop: propTypes.exact({
        left: propTypes.number,
        right: propTypes.number,
        top: propTypes.number,
        bottom: propTypes.number,
    }),
    paddingHorizontal: propTypes.number,
    paddingVertical: propTypes.number,

}