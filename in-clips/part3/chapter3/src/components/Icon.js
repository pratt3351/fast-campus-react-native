import React from 'react';
import IonVectorIcons from '@expo/vector-icons/Ionicons'
import propTypes from 'prop-types';


export class Icon extends React.Component{
    render(){
        return (
            <IonVectorIcons 
                name={this.props.iconName} 
                size={this.props.iconSize}
            />
        )
    }
}

Icon.propTypes = {
    iconName:propTypes.name,
    iconSize:propTypes.number,
}