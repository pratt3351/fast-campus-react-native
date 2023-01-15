import { StyleSheet, Text, View } from 'react-native';
import { Header } from './src/components/Header/Header';
import { HeaderWitoutCompound } from './src/components/HeaderWithoutCompound';
import { Spacer } from './src/components/Spacer';
import {TabIcon} from './src/components/TabIcon';

export default function ScreenComponentApp() {
  return (
    <View style={styles.container}> 


      <HeaderWitoutCompound 
        title='HEADER_TITLE'
        leftIcon={{iconName:'arrow-back', onPress:()=>{console.log('onPressBack')}}}  
        rightIcon={{iconName:'close', onPress:()=>{console.log('close')}}}
      />

      <Header>
          <Header.Group>
            <Header.Icon iconName='arrow-back' onPress={()=>{console.log('onPress')}}></Header.Icon>
            <Spacer horizontal space={24}/>
            <Header.Title title='HEADER-TITLE'/>
          </Header.Group>

          <Header.Icon iconName='close' onPress={()=>{console.log('onPress close')}}/>
        </Header>
          

      <TabIcon iconName='home' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'flex-start',
    backgroundColor: '#fff',
  },
});
