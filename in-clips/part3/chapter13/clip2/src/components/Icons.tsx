import { Ionicons } from '@expo/vector-icons';
import React from 'react';
// export class Icon extends React.Component{
//     render(){
//         return (
//             <Ionicons 
//                 name={this.props.name} 
//                 size={this.props.size} 
//                 color={this.props.color}
//                 />
//         )
//     }
// }

export const Icon:React.FC<{
    name:keyof typeof Ionicons.glyphMap;
    size:number;
    color:string;
}> = (props)=>{

    return (
        <Ionicons 
            name={props.name} 
            size={props.size} 
            color={props.color}
        />
    )
}