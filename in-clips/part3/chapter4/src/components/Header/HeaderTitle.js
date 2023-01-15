import React from 'react';
import { Typograph } from '../Typography';
export class HeaderTitle extends React.Component { 
    render(){
        return (
            <Typograph fontSize={18}>{this.props.title}</Typograph> 
        )
    }
}