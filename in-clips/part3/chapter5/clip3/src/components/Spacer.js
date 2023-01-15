import React from 'react';
import {View} from 'react-native';
import propTypes from 'prop-types';

export const Spacer = (props)=>{
    // return (props.horizontal) ? (
    //     <View style={{marginLeft:props.space}}/>
    // ) : (
    //     <View style={{marginTop:props.space}}/>
    // )
    if(props.horizontal){
        return (
            <View style={{marginLeft:props.space}}/>
        )
    }

    return (
        <View style={{marginTop:props.space}}/>
    )
}

// export class Spacer extends React.Component{
//     render(){
//         if(this.props.horizontal){
//             return (
//                 <View style={{marginLeft:this.props.space}}/>
//             )
//         }
//         return (
//             <View style={{marginTop:this.props.space}} />
//         )
//     }
// }

Spacer.propTypes = {
    horizontal:propTypes.bool,
    space:propTypes.number.isRequired
}

Spacer.defaultProp = {
    horizontal:false,
}