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
                        <Icon iconName={this.props.iconName} iconSize={20}/>
                    </Badge>
                </View>
            )
        }

        return (
            <View style={{padding:4,}}>
                <Icon iconName={this.props.iconName} iconSize={20} />
            </View>
        )
    }
}

TabIcon.propTypes = {
    iconName:propTypes.string.isRequired,
    visibleBadge:propTypes.bool
}