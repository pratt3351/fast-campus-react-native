import React from 'react';
import {Image as RNImage, StyleProp, ImageStyle} from 'react-native';

// export class RemoteImage extends React.Component{
//     render(){
//         return (
//             <RNImage
//                 source={{uri:this.props.url}}
//                 style={[this.props.style, {width:this.props.width, height:this.props.height}]}
//             />
//         )
//     }
// }

export const RemoteImage: React.FC<{
  testID?: string;
  url: string;
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
}> = props => (
  <RNImage
    testID={props.testID}
    source={{uri: props.url}}
    style={[props.style, {width: props.width, height: props.height}]}
  />
);
