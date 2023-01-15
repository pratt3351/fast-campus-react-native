import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from './src/components/Button';
import { Divider } from './src/components/Divider';
import { Header } from './src/components/Header/Header';
import { HookTestCompoent } from './src/components/HookTestComponent';
import { LocalImage } from './src/components/LocalImage';
import { RemoteImage } from './src/components/RemoteImage';
import { Spacer } from './src/components/Spacer';
import { Typography } from './src/components/Typography';
export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const doSum = useCallback(()=>{
    return (a+b)
  }, [a, b])

  return (
    <SafeAreaProvider>
      <View style={{flex:1 }}>
        <Header>
          <Header.Title title='HEADER' ></Header.Title>
        </Header>

        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

          <HookTestCompoent a={a} b={b}></HookTestCompoent>

          <Typography>현재 callback으로 계산 된 값 : {doSum()}</Typography>
          <Button 
            onPress={()=>{
              console.log('press'),
              setA(a+1)
            }}>
            <Typography>A 더하기</Typography>
          </Button>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
 
