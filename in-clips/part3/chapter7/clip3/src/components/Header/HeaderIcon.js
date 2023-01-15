import React from 'react';
import { Button } from '../Button';
import {Icon} from '../Icon';

export const HeaderIcon = (props)=>{
    return (
        <Button onPress={props.onPress}>
            <Icon iconName={props.iconName} iconSize={28} />
        </Button>
    )
}

// export class HeaderIcon extends React.Component { 
//     render(){
//         return (
//             <Button onPress={this.props.onPress}>
//                 <Icon iconName={this.props.iconName} iconSize={28} />
//             </Button>
//         )
//     }
// }