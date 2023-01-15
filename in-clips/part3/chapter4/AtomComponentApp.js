import { StyleSheet, Text, View } from 'react-native';
import { Badge } from './src/components/Badge';
import { Divider } from './src/components/Divider';
import { Icon } from './src/components/Icon';
import { Button } from './src/components/Button';

import { LocalImage } from './src/components/LocalImage';
import { RemoteImage } from './src/components/RemoteImage';
import { Typograph } from './src/components/Typography';

export default function AtomComponentApp() {
  return (
    <View style={styles.container}> 
      <Typograph color='red' fontSize={36}>TEST MESSAGE</Typograph>

      <LocalImage 
        localAsset={require('./assets/favicon.png')}
        width={50}
        height={50}
        />
      <RemoteImage 
        url='https://i.imgur.com/TkIrScD.png'
        width={200}
        height={100}
        />

        <Icon iconName='american-football' iconSize={32}/>


        <Badge>
          <Typograph fontSize={20}>BADGE TEST</Typograph>
        </Badge>

        <Badge>
          <LocalImage 
          localAsset={require('./assets/favicon.png')}
          width={50}
          height={50}
          />
        </Badge>

        <Divider/>


        <View style={{flexDirection:'row', alignItems:'center',}}>

          <Button 
            onPress={()=>{
              console.log('onPress TEXT BUTTON')
            }}>
            <Typograph>
              TEXT BUTTON
            </Typograph>
          </Button>


          <Button 
            onPress={()=>{
              console.log('onPress ICON BUTTON')
            }}
            paddingHorizontal={12}
            paddingVertical={12}
            >
              <Icon iconName='home' />
          </Button>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
