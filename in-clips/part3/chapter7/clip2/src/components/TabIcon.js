import React from 'react';
import { View } from 'react-native';
import { Badge } from './Badge';
import { Icon } from './Icon';

import propTypes from 'prop-types';


export class TabIcon extends React.Component { 
    static defaultProps = {
        visibleBadge:false,
    }
    render(){
        if(this.props.visibleBadge){
            return(
                <View style={{padding:4,}}>
                    <Badge>
                        <Icon iconName={this.props.iconName} iconSize={20} iconColor={this.props.iconColor}/>
                    </Badge>
                </View>
            )
        }

        return (
            <View style={{padding:4,}}>
                <Icon iconName={this.props.iconName} iconSize={20} iconColor={this.props.iconColor} />
            </View>
        )
    }
}

TabIcon.propTypes = {
    iconName: propTypes.oneOfType([propTypes.string, propTypes.function]).isRequired,
    visibleBadge: propTypes.bool
}