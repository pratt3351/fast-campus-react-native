import React from 'react';
import {View} from 'react-native';

export const Divider = (props)=>{
    return (
        <View style={{alignSelf:'stretch', borderWidth:0.5, marginHorizontal:24, borderColor:'gray'}} />
    )
}
// export class Divider extends React.Component{

//     render(){
//         return (
//             <View style={{alignSelf:'stretch', borderWidth:0.5, marginHorizontal:24, borderColor:'gray'}} />
//         )
//     }
// }