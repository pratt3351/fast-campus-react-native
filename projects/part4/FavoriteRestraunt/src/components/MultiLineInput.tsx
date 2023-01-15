import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
export const MultiLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  fontSize?: number;
  onSubmitEditing: () => void;
  height?: number;
}> = props => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: focused ? 'black' : 'gray',
      }}>
      <TextInput
        autoCorrect={false}
        autoCapitalize={'none'}
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={{fontSize: props.fontSize ?? 20, height: props.height ?? 200}}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};
