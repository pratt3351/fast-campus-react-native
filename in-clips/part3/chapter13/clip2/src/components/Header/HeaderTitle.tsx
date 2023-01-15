import React from 'react';
import { Typography } from '../Typography';

export const HeaderTitle:React.FC<{
    title:string
}> = (props)=>{

    return (
        <Typography fontSize={18} numberOfLines={1}>{props.title}</Typography>
    )
}
// export class HeaderTitle extends React.Component{
//     render(){
//         return (
//             <Typography fontSize={18}>{this.props.title}</Typography>
//         )
//     }
// }