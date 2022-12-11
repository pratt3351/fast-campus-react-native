import {NativeModules} from 'react-native';

export const executeCalculator = (
  action: 'plus' | 'minus' | 'divide' | 'multiply',
  numA: number,
  numB: number,
): Promise<number> => {
  return NativeModules.CalculatorModule.executeCalc(action, numA, numB);
};
