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

export type TypeIconName = keyof typeof Ionicons.glyphMap;

export const Icon:React.FC<{
    name:TypeIconName
    size:number;
    color:string;
}> = (props) => (
  <Ionicons
    name={props.name}
    size={props.size}
    color={props.color}
  />
);
