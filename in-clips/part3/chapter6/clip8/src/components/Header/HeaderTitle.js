import React from 'react';
import { Typography } from '../Typography';
// export class HeaderTitle extends React.Component { 
//     render(){
//         return (
//             <Typograph fontSize={18}>{this.props.title}</Typograph> 
//         )
//     }
// }

export const HeaderTitle = (props)=>{
    return (
        <Typography fontSize={18}>{props.title}</Typography> 
    )
}