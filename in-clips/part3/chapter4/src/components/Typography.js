import React from 'react';
import {Text as RNText} from 'react-native';
import PropTypes from 'prop-types';


export const Typograph = (props)=>{

    return (
        <RNText 
            style={{
                color:props.color, 
                fontSize:props.fontSize
            }}
        >
        {props.children}
        </RNText>
    )
}
// export class Typograph extends React.Component { 
//     render(){
//         return(
//             <RNText 
//                 style={{
//                     color:this.props.color, 
//                     fontSize:this.props.fontSize
//                 }}
//             >
//                 {this.props.children}
//             </RNText>
//         )
//     }
// }


Typograph.propTypes = {
    color:PropTypes.string,
    fontSize:PropTypes.number.isRequired,
    children:PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
}