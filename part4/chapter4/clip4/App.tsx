/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  NativeModules,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {executeCalculator} from './NativeCalculatorUtils';
type TypeCalcAction =
  | 'plus'
  | 'minus'
  | 'multiply'
  | 'divide'
  | 'clear'
  | 'equal';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const screenSize = useWindowDimensions();
  const buttonSize = screenSize.width / 4;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [resultNum, setResultNum] = useState('');

  const [inputNum, setInputNum] = useState('');
  const [tempNumA, setTempNumA] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const onPressNumber = useCallback<(pressed: number) => void>(
    pressed => {
      if (resultNum !== '') {
        setResultNum('');
      }

      setInputNum(prevState => {
        const nextNum = parseInt(`${prevState}${pressed}`);
        return nextNum.toString();
      });
    },
    [resultNum],
  );

  const onPressAction = useCallback<(pressed: TypeCalcAction) => Promise<void>>(
    async pressed => {
      console.log(pressed);

      if (pressed === 'clear') {
        setInputNum('');
        setTempNumA(0);
        setResultNum('');

        return;
      }

      if (pressed === 'equal') {
        if (tempNumA !== 0) {
          const result = await NativeModules.CalculatorModule.executeCalc(
            lastAction,
            tempNumA,
            parseInt(inputNum),
          );

          console.log(result);

          setInputNum(result.toString());
          setTempNumA(0);
        }
        return;
      }

      setLastAction(pressed);
      if (resultNum !== '') {
        //어떤 결과값이 있는 상태.
        setTempNumA(parseInt(resultNum));
        setResultNum('');
        setInputNum('');
      } else if (tempNumA === 0) {
        //입력되지 않은 상태.
        setTempNumA(parseInt(inputNum));
        setInputNum('');
      } else {
        //입력한 숫자가 있는 상태
        const result = await executeCalculator(
          pressed,
          tempNumA,
          parseInt(inputNum),
        );

        console.log(result);

        setResultNum(result.toString());
        setTempNumA(0);
      }
    },
    [resultNum, tempNumA, lastAction, inputNum],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text style={{fontSize: 48, padding: 48}}>
            {resultNum !== '' ? resultNum : inputNum}
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
              <Pressable
                style={{
                  width: buttonSize - 4,
                  height: buttonSize - 4,
                  borderRadius: (buttonSize - 4) * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}
                onPress={() => onPressNumber(number)}>
                <Text style={{fontSize: 24}}>{number}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{paddingHorizontal: 12}}>
            {[
              {label: '+', action: 'plus'},
              {label: '-', action: 'minus'},
              {label: '*', action: 'multiply'},
              {label: '/', action: 'divide'},
              {label: 'C', action: 'clear'},
              {label: '=', action: 'equal'},
            ].map(action => (
              <Pressable
                style={{
                  width: screenSize.width / 6,
                  height: screenSize.width / 6,
                  borderRadius: buttonSize * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'lightgray',
                }}
                onPress={() => onPressAction(action.action as TypeCalcAction)}>
                <Text style={{fontSize: 24}}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
