import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// export class Divider extends React.Component{

//     render(){
//         return (
//             <View style={{alignSelf:'stretch', borderWidth:0.5, marginHorizontal:24, borderColor:'gray'}} />
//         )
//     }
// }

export const Divider:React.FC = () => {
  const [data] = useState('');
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={{
      alignSelf: 'stretch',
      borderWidth: 0.5,
      marginHorizontal: 24,
      borderColor: 'gray',
    }}
    />
  );
};
