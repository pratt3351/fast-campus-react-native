import React from 'react';
import {View} from 'react-native';
import { Typography } from './Typography';

// export class Badge extends React.Component {
//     render(){
//         return (
//             <View>
//                 <View>
//                     {this.props.children}

//                     <View
//                      style={[{
//                         width:16, 
//                         height:16,
//                         borderRadius:8,
//                         backgroundColor:'red',
//                         alignItems:'center',
//                         justifyContent:'center',
//                     }, {
//                         position:'absolute',
//                         right:-5,
//                         top:-5
//                     }]}>
//                         <Typography fontSize={this.props.fontSize} color={'white'}>N</Typography>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
// }

export const Badge = (props)=>{

    return (
        <View>
            {props.children}
            <View style={[{
                width:16, 
                height:16, 
                borderRadius:8, 
                backgroundColor:'red',
                alignItems:'center',
                justifyContent:'center',
            }, { 
                position:'absolute',
                right:-5,
                top:-5
            }]}>
                <Typography fontSize={10} color='white'/>
            </View>
        </View>
    )
}